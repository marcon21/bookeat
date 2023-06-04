import { makeKey } from "../utils"

export default function DashboardLateralBar({ list, setRedirect }) {
    const items = list.map((item, index) => {
        return (
            <li className="nav-item" key={makeKey(index)}>
                <a className="nav-link align-middle px-0" onClick={(e) => {
                    setRedirect(item.link)
                }}>
                    <i className={item.icon}></i>{" "}
                    <span className="ms-1 d-sm-inline">{item.label}</span>
                </a>
            </li>
        )
    })

    return (
        <>
            <div className="position-sticky pt-3">
                <ul className="nav flex-column ">
                    {items}
                </ul>
                <hr />
                <img src="/logo.svg" className="rounded mx-auto d-block w-50 d-none d-md-block" alt="logo" />
            </div>
        </>

    )
}       