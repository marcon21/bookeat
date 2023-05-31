import { useLoaderData, Navigate } from "react-router-dom";
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
    const [redirect, setRedirect] = useState(false)
    const [filter, setFilter] = useState([0, 0]) // [sectiom, subsection] - 0 if no filter, string matching to filter
    if (!useLoaderData()["status"]) {
        return (
            <div className="alert alert-danger" role="alert">
                {useLoaderData()["message"]}
            </div>
        )
    }
    const [checkout, setCheckout] = useState([])
    const addToCheckout = (item) => {
        let checkoutCopy = structuredClone(checkout)
        checkoutCopy.push(item)
        setCheckout(checkoutCopy)
    }
    console.log(checkout)

    let menu = structuredClone(useLoaderData()["data"])
    let menuCategories = structuredClone(useLoaderData()["data"]["categorie"])
    let pageName = filter[0] === 0 ? 'Menu completo' : filter[1] === 0 ? "Menu: ".concat(filter[0]) : "Menu: ".concat(filter[0]).concat(" - ").concat(filter[1])

    // Handler to be passed as prop to child components
    // Used to let them edit the filter
    function onFilterClickHandler(section = 0, subsection = 0) {
        setFilter([section, subsection])
    }
    return (
        <>
            {redirect && <Navigate to={redirect} />}
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <NavBar label={pageName} onFilterClickHandler={onFilterClickHandler} setRedirect={setRedirect} />
            </header>

            <div className="container-fluid">
                <div className="row">

                    {/* /Lateralbar */}
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar sidebar-sticky collapse">
                        <LateralBar list={menuCategories} onFilterClickHandler={onFilterClickHandler} />
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <MenuSections menu={menu} filter={filter} addToCheckout={addToCheckout} />
                    </main>
                </div>
            </div>
        </>
    )
}