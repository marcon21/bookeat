import { useState } from "react"
import { makeKey } from "../utils"

export default function LateralBar({ list, onFilterClickHandler }) {
    const localList = structuredClone(list)

    // Data processing, mapping each element from backend in the correct html object
    const items = localList.map((item, index) => {
        const chlist = item.childrens.map((chitem, chindex) => {
            return (
                <li key={makeKey(chindex)} onClick={(e) => onFilterClickHandler(item['label'], chitem['label'])}>
                    <a className="nav-link px-0">
                        <span className="d-none d-sm-inline">{chitem.label}</span>
                    </a>
                </li>
            )
        })
        return (
            <li className="nav-item" key={makeKey(index)}>
                <div onClick={(e) => onFilterClickHandler(item['label'], 0)}>
                    <a className="nav-link align-middle px-0">
                        <i className={item.icon}></i>{" "}
                        <span className="ms-1 d-none d-sm-inline">{item.label}</span>
                    </a>
                </div>
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
                <img src="/logo.svg" className="rounded mx-auto d-block w-50 d-none d-md-block" alt="logo" />

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