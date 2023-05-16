import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import LateralBar from "../components/LateralBar";
import MenuSections from "../components/MenuSections";
import NavBar from "../components/Navbar";

import { getMenu } from "../requests";

export async function loader() {
    const menu = await getMenu()
    return menu
}

export default function MenuRoute() {
    const [filter, setFilter] = useState([0, 0])
    let menu = structuredClone(useLoaderData())
    let menuPlacement = structuredClone(useLoaderData()['placement'])
    let pageName = filter[0] === 0 ? 'Menu completo' : filter[1] === 0 ? "Menu: ".concat(filter[0]) : "Menu: ".concat(filter[0]).concat(" - ").concat(filter[1])

    function onFilterClickHandler(section=0, subsection=0) {
        setFilter([section, subsection])
    }

    return (
        <>
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <LateralBar list={menuPlacement} onFilterClickHandler={onFilterClickHandler} />
                </div>
                <div className="col-auto col-md-9 col-xl-10 px-sm-10">
                    <div className="row">
                        <NavBar label={pageName} onFilterClickHandler={onFilterClickHandler} />
                    </div>
                    <div className="row ms-2 me-2">
                        <MenuSections menu={menu} filter={filter} />
                    </div>
                </div>

            </div>
        </>

    )
}