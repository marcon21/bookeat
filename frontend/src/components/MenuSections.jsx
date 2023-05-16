import MenuItem from "./MenuItem"

export default function MenuSections({ menu }) {

    // Data processing and filtering
    const items = menu['placement'].map((item, index) => {
        let r
        if (item['childrens'].length == 0) {
            r = menu['menu'].filter((plate) => {
                return plate.section === item['label']
            }).map((plate) => {
                return (
                    <div className="col mt-3">
                        <MenuItem name={plate['name']} description={plate['description']} price={plate['price']} />
                    </div>
                )
            })
            return (
                <>
                    <h2 className="mt-4">{item['label']}</h2>
                    <div className="row">
                        {r}
                    </div>
                </>
            )
        } else {
            r = item['childrens'].map((subsection) => {
                const plates = menu['menu'].filter((plate) => {
                    return (plate.section === item['label'] && plate.subsection === subsection['label'])
                }).map((plate) => {
                    return (
                        <div className="col mt-3">
                            <MenuItem name={plate['name']} description={plate['description']} price={plate['price']} />
                        </div>
                    )
                })
                return (
                    <>
                        <h4 className="mt-2">{subsection['label']}</h4>
                        <div className="row">
                            {plates}
                        </div>
                    </>
                )
            })
            return (
                <>
                    <h2 className="mt-4">{item['label']}</h2>
                    {r}
                </>
            )
        }
    })

    return (
        <>
            {items}
        </>
    )
}