import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import LateralBar from "../components/LateralBar";
import MenuSections from "../components/MenuSections";
import NavBar from "../components/Navbar";

import { getMenu } from "../requests";
import Modal from "../components/Modal";

// Loader function called each time route is visited
export async function loader() {
    const menu = await getMenu()
    return menu
}

export default function MenuRoute() {
    const [filter, setFilter] = useState([0, 0]) // [sectiom, subsection] - 0 if no filter, string matching to filter
    if (!useLoaderData()["status"]) {
        return (
            <div className="alert alert-danger" role="alert">
                {useLoaderData()["message"]}
            </div>
        )
    }
    let menu = structuredClone(useLoaderData()["data"])
    let menuCategories = structuredClone(useLoaderData()["data"]["categorie"])
    let pageName = filter[0] === 0 ? 'Menu completo' : filter[1] === 0 ? "Menu: ".concat(filter[0]) : "Menu: ".concat(filter[0]).concat(" - ").concat(filter[1])

    // Handler to be passed as prop to child components
    // Used to let them edit the filter
    function onFilterClickHandler(section = 0, subsection = 0) {
        setFilter([section, subsection])
    }

    // return (
    //     <>
    //         <div className="row flex-nowrap">
    //             <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
    //                 <LateralBar list={menuCategories} onFilterClickHandler={onFilterClickHandler} />
    //             </div>
    //             <div className="col-auto col-md-9 col-xl-10 px-sm-10">
    //                 <div className="row">
    //                     <NavBar label={pageName} onFilterClickHandler={onFilterClickHandler} />
    //                 </div>
    //                 <div className="row ms-2 me-2">
    //                     <MenuSections menu={menu} filter={filter} />
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // )
    return (
        <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark position-fixed" style={{ height: '100vh', overflowY: 'auto', scrollSnapType: 'none' }}>
                <LateralBar list={menuCategories} onFilterClickHandler={onFilterClickHandler} />
            </div>
            <div className="col-auto col-md-9 col-xl-10 px-sm-10" style={{ marginLeft: 'calc(100% / 6)', scrollSnapType: 'none' }}>
                <div className="row" style={{ overflowY: 'auto' }}>
                    <NavBar label={pageName} onFilterClickHandler={onFilterClickHandler} />
                </div>
                <div className="row ms-2 me-2" style={{ overflowY: 'auto' }}>
                    <MenuSections menu={menu} filter={filter} />
                </div>
            </div>
        </div>
    )
}