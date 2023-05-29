import { useState } from "react"
import { formatCategoryList, makeKey } from "../utils"
import { logout } from "../requests"

export default function LateralBar({ list, onFilterClickHandler }) {
    const formattedCategoryList = formatCategoryList(list)

    // Data processing, mapping each element from backend in the correct html object
    const items = formattedCategoryList.map((item, index) => {
        const chlist = item.childrens.map((chitem, chindex) => {
            return (
                <li className="d-none d-md-block" key={makeKey(chindex)} onClick={(e) => onFilterClickHandler(item['label'], chitem)}>
                    <a className="nav-link px-0">
                        <span className="d-none d-sm-inline">{chitem}</span>
                    </a>
                </li>
            )
        })
        return (
            <li className="nav-item" key={makeKey(index)}>
                <a className="nav-link align-middle px-0" onClick={(e) => onFilterClickHandler(item['label'], 0)}>
                    <i className={item.icon}></i>{" "}
                    <span className="ms-1 d-sm-inline">{item.label}</span>
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
        <div className="position-sticky pt-3">
            <ul className="nav flex-column ">
                {items}
            </ul>
            <hr />
            <img src="/logo.svg" className="rounded mx-auto d-block w-50 d-none d-md-block" alt="logo" />
        </div>
    )
}       