import { useState } from 'react'
import { getMenu, insertPlate, editPlate, deletePlate } from '../requests'
import { Navigate, useLoaderData } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { makeKey } from '../utils'
import Modal from '../components/Modal'
import AddPlateModal from '../components/AddPlateModal'
import EditPlateModal from '../components/EditPlateModal'

export async function loader() {
    const menu = await getMenu()
    return menu
}

export default function EditMenuRoute() {
    // users ENUM: UtenteLoggato, Tavolo, Sala, Cucina, Manager
    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null

    const [redirect, setRedirect] = useState((userType === "Manager" || userType === "Cucina") ? false : "/")
    const [menu, setMenu] = useState(useLoaderData()["data"]["piatti"])

    let handleToggle = async (index) => {
        console.log(menu[index])
        let r = await editPlate(menu[index]["_id"], menu[index]["nome"], menu[index]["prezzo"], menu[index]["categoria"], !menu[index]["disponibile"], menu[index]["descrizione"], menu[index]["allergeni"], menu[index]["ingredientiModificabili"])
        if (r["status"] === "success") {
            let menuCopy = structuredClone(menu)
            menuCopy[index]["disponibile"] = !menuCopy[index]["disponibile"]
            setMenu(menuCopy)
            setMenu((await getMenu())["data"]["piatti"])
        }
    }

    let handleAddPlate = async (data) => {
        console.log(data)
        // data["allergeni"] = data["allergeni"].split(", ")
        // data["ingredientiModificabili"] = data["ingredientiModificabili"].split(", ")
        // let r = await insertPlate(data["nome"], data["prezzo"], data["categoria"], data["disponibile"], data["descrizione"], data["allergeni"], data["ingredientiModificabili"])
        // if (r["status"] === "success") {
        //     setMenu((await getMenu())["data"]["piatti"])
        // }
    }

    let handleEditPlate = async (data) => {
        console.log(data)
        // data["allergeni"] = data["allergeni"].split(", ")
        // data["ingredientiModificabili"] = data["ingredientiModificabili"].split(", ")
        // let r = await editPlate(data["nome"], data["prezzo"], data["categoria"], data["disponibile"], data["descrizione"], data["allergeni"], data["ingredientiModificabili"])
        // if (r["status"] === "success") {
        //     setMenu((await getMenu())["data"]["piatti"])
        // }
    }

    let handleDeletePlate = async (index) => {
        console.log(menu[index])
        // let r = await deletePlate(menu[index]["_id"])
        // if (r["status"] === "success") {
        //     setMenu((await getMenu())["data"]["piatti"])
        // }
    }

    function launchModal(modalId) {
        document.getElementById(modalId.concat("Button")).click()
    }

    const modals = menu.map((item, index) => {
        return (
            <EditPlateModal key={makeKey(index)} onSubmit={handleEditPlate} modalId="editMenuModal" item={item} index={index} />
        )
    })

    const items = menu.map((item, index) => {
        return (
            <tr key={makeKey(index)}>
                <td>
                    <div className="btn-group">
                        {userType === "Manager" &&
                            <button type="button" className="btn btn-outline-dark" onClick={() => { launchModal("editMenuModal-" + index) }} ><i className='bi bi-pencil'></i></button>
                        }
                        {item["disponibile"] ?
                            <button type="button" className="btn btn-success" onClick={() => { handleToggle(index) }} ><i className='bi bi-check'></i></button> :
                            <button type="button" className="btn btn-danger" onClick={() => { handleToggle(index) }} ><i className='bi bi-x'></i></button>
                        }
                        {userType === "Manager" &&
                            <button type="button" className="btn btn-outline-danger" onClick={() => { handleDeletePlate(index) }} ><i className='bi bi-trash'></i></button>
                        }
                    </div>
                </td>
                <td>{item["nome"]}</td>
                <td>{item["descrizione"]}</td>
                <td>{(item["prezzo"] / 100).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</td>
                <td>{item["categoria"]["primaria"]}</td>
                <td>{item["categoria"]["secondaria"]}</td>
                <td>{item["allergeni"].join(", ")}</td>
                <td>{item["ingredientiModificabili"].join(", ")}</td>
            </tr>
        )
    })

    if (userType === "Manager" || userType === "Cucina") {
        return (
            <>
                {redirect && <Navigate to={redirect} />}
                <h3 className='mt-4'>Modifica Menu</h3>
                {userType === "Manager" &&
                    <button type="button" className="btn btn-outline-success" onClick={() => { launchModal("addMenuModal") }} ><i className='bi bi-plus'></i>Aggiungi un piatto</button>
                }
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrizione</th>
                                <th scope="col">Prezzo</th>
                                <th scope="col">Cat. Primaria</th>
                                <th scope="col">Cat. Secondaria</th>
                                <th scope="col">Allergeni</th>
                                <th scope="col">Ingredienti modificabili</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>
                {userType === "Manager" &&
                    <AddPlateModal onSubmit={handleAddPlate} modalId="addMenuModal" />
                }
                {userType === "Manager" &&
                    modals
                }
            </>
        )
    } else {
        return (
            <>
                {redirect && <Navigate to={redirect} />}
            </>
        )
    }
}