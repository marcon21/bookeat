import { useLoaderData, Navigate } from "react-router-dom";
import { useState } from "react";

import LateralBar from "../components/LateralBar";
import MenuSections from "../components/MenuSections";
import NavBar from "../components/Navbar";

import { getMenu, sendOrder } from "../requests";
import Modal from "../components/Modal";
import CheckOut from "../components/CheckOut"

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
    const removeFromCheckout = (index) => {
        let checkoutCopy = structuredClone(checkout)
        checkoutCopy.splice(index, 1)
        setCheckout(checkoutCopy)
    }
    const increasePriority = (index) => {
        let checkoutCopy = structuredClone(checkout)
        // if there arent items with same priority as the one we want to increase, dont increase
        if (checkoutCopy.filter((item) => item["priorita"] === checkoutCopy[index]["priorita"]).length === 1) {
            return
        }
        checkoutCopy[index]["priorita"] += 1
        setCheckout(checkoutCopy)
    }
    const decreasePriority = (index) => {
        let checkoutCopy = structuredClone(checkout)
        let maxPriorita = 0
        checkoutCopy.forEach((item) => {
            if (item["priorita"] > maxPriorita) {
                maxPriorita = item["priorita"]
            }
        })
        // if there arent items with same priority as the one we want to decrease, dont decrease, but only to priorities between 0 and maxPriority
        if (checkoutCopy.filter((item) => item["priorita"] === checkoutCopy[index]["priorita"]).length === 1 && checkoutCopy[index]["priorita"] > 0 && checkoutCopy[index]["priorita"] < maxPriorita) {
            return
        }

        if (checkoutCopy[index]["priorita"] > 0) {
            checkoutCopy[index]["priorita"] -= 1
            setCheckout(checkoutCopy)
        }
    }

    const checkoutHandler = async () => {
        let checkoutCopy = structuredClone(checkout)
        checkoutCopy.forEach((item) => {
            delete item["nome"]
            delete item["prezzo"]
            item["idPiatto"] = item["_id"]
            delete item["_id"]
        })
        let r = await sendOrder({ "portate": checkoutCopy })
        if (r["status"]) {
            setCheckout([])
            // setRedirect("/bill")
        } else {
            alert(r["message"])
        }
    }



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
                <NavBar label={pageName} onFilterClickHandler={onFilterClickHandler} setRedirect={setRedirect} checkout={checkout} />
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

            <Modal
                modalId={"checkoutModal"}
                title={"Carrello"}
                closeButtonText="Chiudi"
                confirmButtonText="Invia Ordine"
                closeFunction={() => { console.log("close") }}
                confirmFunction={checkoutHandler}
                showButtons={checkout.length > 0}
            >
                <CheckOut checkoutList={checkout} removeFromCheckout={removeFromCheckout} increasePriority={increasePriority} decreasePriority={decreasePriority} />
            </Modal>
        </>
    )
}