import { formatCategoryList, makeKey } from "../utils"
import MenuItem from "./MenuItem"

export default function MenuSections({ menu, filter }) {
    let menuCategories = formatCategoryList(menu['categorie'])
    let menuPlates = menu['piatti']

    // Filtering
    if (filter[0] !== 0) {
        menuCategories = menuCategories.filter((s) => s['label'] === filter[0])
        menuPlates = menuPlates.filter((p) => p['categoria']['primaria'] === filter[0])
    }
    if (filter[1] !== 0) {
        menuCategories = menuCategories.map((s) => {
            s['childrens'] = s['childrens'].filter((c) => c === filter[1])
            return s
        })
        menuPlates = menuPlates.filter((p) => {
            if (p['categoria']['secondaria']) {
                return p['categoria']['secondaria'] === filter[1]
            } else {
                return false
            }
        })
    }

    // Data processing, mapping each element from backend in the correct html object to create nested sections
    const items = menuCategories.map((item, index) => {
        let r
        if (item['childrens'].length == 0) {
            r = menuPlates.filter((plate) => {
                return plate['categoria']['primaria'] === item['label']
            }).map((plate, pindex) => {
                return (
                    <div className="col mt-3" key={makeKey(pindex)}>
                        <MenuItem plate={plate} />
                    </div>
                )
            })
            return (
                <div key={makeKey(index)}>
                    <h2 className="mt-4">{item['label']}</h2>
                    <div className="d-flex flex-wrap">
                        <div className="row">
                            {r}
                        </div>
                    </div>
                </div>
            )
        } else {
            r = item['childrens'].map((subsection, sindex) => {
                const plates = menuPlates.filter((plate) => {
                    return (plate['categoria']['primaria'] === item['label'] && plate['categoria']['secondaria'] === subsection)
                }).map((plate, pindex) => {
                    return (
                        <div className="col mt-3" key={makeKey(pindex)}>
                            <MenuItem plate={plate} />
                        </div>
                    )
                })
                return (
                    <div key={makeKey(sindex)}>
                        <h4 className="mt-2" >{subsection}</h4>
                        <div className="d-flex flex-wrap">
                            <div className="row">
                                {plates}
                            </div>
                        </div>
                    </div>
                )
            })
            return (
                <div key={makeKey(index)}>
                    <h2 className="mt-4">{item['label']}</h2>
                    <div className="d-flex flex-wrap">
                        <div className="row">
                            {r}
                        </div>
                    </div>
                </div>
            )
        }
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {items}
                </div>
            </div>
        </div>
    )
}