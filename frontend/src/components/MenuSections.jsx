import { makeKey } from "../utils"
import MenuItem from "./MenuItem"

export default function MenuSections({ menu, filter }) {

    // Filtering
    if(filter[0] !== 0) {
        menu['placement'] = menu['placement'].filter((s) => s['label'] === filter[0])
        menu['menu'] = menu['menu'].filter((p) => p['section'] === filter[0])
    }
    if(filter[1] !== 0) {
        menu['placement'] = menu['placement'].map((s)=>{
            s['childrens'] = s['childrens'].filter((c) => ['label'] === filter[1])
            return s
        })
        menu['menu'] = menu['menu'].filter((p) => p['subsection'] === filter[1])
    }

    // Data processing, mapping each element from backend in the correct html object to create nested sections
    const items = menu['placement'].map((item, index) => {
        let r
        if (item['childrens'].length == 0) {
            r = menu['menu'].filter((plate) => {
                return plate.section === item['label']
            }).map((plate, pindex) => {
                return (
                    <div className="col mt-3" key={makeKey(pindex)}>
                        <MenuItem name={plate['name']} description={plate['description']} price={plate['price']} />
                    </div>
                )
            })
            return (
                <div key={makeKey(index)}>
                    <h2 className="mt-4">{item['label']}</h2>
                    <div className="row">
                        {r}
                    </div>
                </div>
            )
        } else {
            r = item['childrens'].map((subsection, sindex) => {
                const plates = menu['menu'].filter((plate) => {
                    return (plate.section === item['label'] && plate.subsection === subsection['label'])
                }).map((plate, pindex) => {
                    return (
                        <div className="col mt-3" key={makeKey(pindex)}>
                            <MenuItem name={plate['name']} description={plate['description']} price={plate['price']} />
                        </div>
                    )
                })
                return (
                    <div key={makeKey(sindex)}>
                        <h4 className="mt-2" >{subsection['label']}</h4>
                        <div className="row">
                            {plates}
                        </div>
                    </div>
                )
            })
            return (
                <div key={makeKey(index)}>
                    <h2 className="mt-4">{item['label']}</h2>
                    {r}
                </div>
            )
        }
    })

    return (
        <>
            {items}
        </>
    )
}