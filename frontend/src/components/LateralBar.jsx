export default function LateralBar() {
    let list = [
        {
            label: "Antipasti",
            link: "#",
            icon: "bi bi-heptagon",
            childrens: [
                {
                    label: "Terra",
                    link: "#",
                },
                {
                    label: "Mare",
                    link: "#",
                }
            ]
        },
        {
            label: "Primi",
            link: "#",
            icon: "bi bi-dice-1",
            childrens: []
        },
        {
            label: "Secondi",
            link: "#",
            icon: "bi bi-dice-2",
            childrens: []
        },
        {
            label: "Pizza",
            link: "#",
            icon: "bi bi-dice-3",
            childrens: []
        },
        {
            label: "Dolci",
            link: "#",
            icon: "bi bi-tencent-qq",
            childrens: []
        },
        {
            label: "Bevande",
            link: "#",
            icon: "bi bi-cup-straw",
            childrens: []
        },
    ]
    const items = list.map((item, index) => {
        const chlist = item.childrens.map((chitem, chindex) => {
            return (
                <li>
                    <a href={chitem.link} className="nav-link px-0">
                        <span className="d-none d-sm-inline">{chitem.label}</span>
                    </a>
                </li>
            )
        })

        return (
            <li className="nav-item">
                <a href={item.link} className="nav-link align-middle px-0">
                    <i className={item.icon}></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">{item.label}</span>
                </a>
                {item.childrens.length !== 0 &&
                    <ul
                        className="collapse show nav flex-column ms-1"
                        id="submenu1"
                        data-bs-parent="#menu"
                    >
                        {chlist}
                    </ul>
                }
            </li>
        )
    })

    return (
        <>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <span className="fs-5 d-none d-sm-inline">User Name</span>
                <hr />

                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu" >
                    {items}
                </ul>

                <hr />
                <img src="/logo.svg" className="rounded mx-auto d-block w-50 d-none d-sm-block" alt="logo" />

                <ul className="nav nav-pills flex-column mb-2 mb-0 align-items-bottom align-items-sm-start" id="menu" >
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className='bi bi-box-arrow-right nav_icon'></i> <span className="nav_namms-1 d-none d-sm-inline">SignOut</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className='bi bi-gear-fill nav_icon'></i> <span className="ms-1 d-none d-sm-inline">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}       