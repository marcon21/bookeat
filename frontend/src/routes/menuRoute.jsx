import { useLoaderData, Navigate } from "react-router-dom";
import { useState } from "react";

import LateralBar from "../components/LateralBar";
import MenuSections from "../components/MenuSections";
import NavBar from "../components/Navbar";

import { getMenu, sendOrder, openBill, getBill } from "../requests";
import Modal from "../components/Modal";
import CheckOut from "../components/CheckOut"

import { toast } from 'react-toastify'
import TableOrders from "../components/TableOrders";

// Loader function called each time route is visited
export async function loader() {
    const menu = await getMenu()
    // filter menu["data"]["piatti"] to only include available plates
    menu["data"]["piatti"] = menu["data"]["piatti"].filter((item) => item["disponibile"])
    // filter menu["data"]["categorie"] to only include categories that have at least one plate available
    menu["data"]["categorie"] = menu["data"]["categorie"].filter((item) => menu["data"]["piatti"].some((plate) => plate["categoria"]["primaria"] === item["primaria"] && plate["disponibile"]))
    // filter menu["data"]["categorie"] to only include secondary categories that have at least one plate available
    menu["data"]["categorie"].forEach((item) => {
        if (item["secondaria"]) {
            if (!menu["data"]["piatti"].some((plate) => plate["categoria"]["primaria"] === item["primaria"] && plate["categoria"]["secondaria"] === item["secondaria"] && plate["disponibile"])) {
                item["secondaria"] = undefined
            }
        }
    })
    return menu
}

export default function MenuRoute() {
    const [redirect, setRedirect] = useState(false)

    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null
    let isUser = userType === "UtenteLoggato"
    let isTable = userType === "Tavolo"

    const [hasOpenBill, setHasOpenBill] = useState(localStorage.getItem("billID") !== null)
    const handleCloseBill = () => {
        localStorage.removeItem("billID")
        setHasOpenBill(false)
    }

    const [filter, setFilter] = useState([0, 0]) // [sectiom, subsection] - 0 if no filter, string matching to filter
    if (!useLoaderData()["status"]) {
        return (
            <div className="alert alert-danger" role="alert">
                {useLoaderData()["message"]}
            </div>
        )
    }
    const [checkout, setCheckout] = useState(localStorage.getItem("checkout") === null ? [] : JSON.parse(localStorage.getItem("checkout")))
    const addToCheckout = (item) => {
        let checkoutCopy = structuredClone(checkout)
        checkoutCopy.push(item)
        setCheckout(checkoutCopy)
        localStorage.setItem("checkout", JSON.stringify(checkoutCopy))
        toast.success(item["nome"] + " nel carrello")
    }
    const removeFromCheckout = (index) => {
        let plateName = checkout[index]["nome"]
        let checkoutCopy = structuredClone(checkout)
        checkoutCopy.splice(index, 1)
        setCheckout(checkoutCopy)
        localStorage.setItem("checkout", JSON.stringify(checkoutCopy))
        toast.success(plateName + " rimosso dal carrello")
    }
    const increasePriority = (index) => {
        let checkoutCopy = structuredClone(checkout)
        // if there arent items with same priority as the one we want to increase, dont increase
        if (checkoutCopy.filter((item) => item["priorita"] === checkoutCopy[index]["priorita"]).length === 1) {
            return
        }
        checkoutCopy[index]["priorita"] += 1
        setCheckout(checkoutCopy)
        localStorage.setItem("checkout", JSON.stringify(checkoutCopy))
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
            localStorage.setItem("checkout", JSON.stringify(checkoutCopy))
        }
    }

    const checkoutHandler = async () => {
        let checkoutCopy = structuredClone(checkout)
        if (isUser) {
            // save checkout copy and pass it to the next route and redirect
            localStorage.setItem("checkout", JSON.stringify(checkoutCopy))
            setRedirect("/checkout")
        } else if (isTable) {
            // send order to backend
            checkoutCopy.forEach((item) => {
                delete item["nome"]
                delete item["prezzo"]
                item["idPiatto"] = item["_id"]
                delete item["_id"]
                // rename key priorita to prioritá
                // item["prioritá"] = item["priorita"]
                // delete item["priorita"]
            })
            let rt = await sendOrder({ "portate": checkoutCopy })
            let promiseApi = new Promise((resolve, reject) => {
                if (rt["status"]) {
                    resolve(rt)
                } else {
                    reject(rt)
                }
            })
            await toast.promise(promiseApi, {
                pending: {
                    render({ data }) {
                        return "Invio ordine in corso..."
                    }
                },
                success: {
                    render({ data }) {
                        setCheckout([])
                        localStorage.removeItem("checkout")
                        return "Ordine inviato con successo"
                    }
                },
                error: "Errore: " + rt["message"]
            }).catch((err) => { })
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
                        {!isTable &&
                            <LateralBar list={menuCategories} onFilterClickHandler={onFilterClickHandler} />
                        }
                        {isTable && hasOpenBill &&
                            <LateralBar list={menuCategories} onFilterClickHandler={onFilterClickHandler} />
                        }
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {!isTable &&
                            <MenuSections menu={menu} filter={filter} addToCheckout={addToCheckout} />
                        }
                        {isTable && hasOpenBill &&
                            <MenuSections menu={menu} filter={filter} addToCheckout={addToCheckout} />
                        }
                        {isTable && !hasOpenBill &&
                            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-center">
                                        <h1>Benvenuti</h1>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12 d-flex justify-content-center">
                                        {/* inserire il numero di persone al tavolo */}
                                        <input type="number" id="nCoperti" className="form-control" placeholder="In quanti siete?" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-12 d-flex justify-content-center">
                                        <button className="btn btn-dark" onClick={async () => {
                                            let nCoperti = document.getElementById("nCoperti").value
                                            if (nCoperti !== "" && nCoperti > 0 && nCoperti < 50) {
                                                let rt = await openBill({ "nCoperti": nCoperti })
                                                if (rt["status"]) {
                                                    setHasOpenBill(true)
                                                    localStorage.setItem("billID", rt["data"])
                                                    localStorage.removeItem("checkout")
                                                    setCheckout([])
                                                } else {
                                                    toast.error(rt["message"])
                                                }
                                            }
                                        }}>Inizia</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </main>
                </div>
            </div>

            <Modal
                modalId={"checkoutModal"}
                title={"Carrello"}
                closeButtonText="Chiudi"
                confirmButtonText="Conferma selezione"
                closeFunction={() => { console.log("close") }}
                confirmFunction={checkoutHandler}
                showButtons={checkout.length > 0}
            >
                <CheckOut checkoutList={checkout} removeFromCheckout={removeFromCheckout} increasePriority={increasePriority} decreasePriority={decreasePriority} />
            </Modal>

            <Modal
                modalId={"closeBillModal"}
                title={"Chiudi conto"}
                closeButtonText="Annulla"
                confirmButtonText="Conferma"
                closeFunction={ () => { console.log("close") } }
                confirmFunction={ handleCloseBill }
                showButtons={true}
            >
                <div className="alert alert-danger" role="alert">Avete terminato la vostra cena e siete pronti ad andare in cassa a pagare?</div>
                <h1>Riepilogo piatti ordinati</h1>
                <TableOrders />
            </Modal>
        </>
    )
}