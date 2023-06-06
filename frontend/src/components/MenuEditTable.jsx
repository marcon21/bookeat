import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { makeKey } from "../utils"
import { getMenu, insertPlate, editPlate, deletePlate } from '../requests'
import AddPlateModal from '../components/AddPlateModal'
import EditPlateModal from '../components/EditPlateModal'

import { toast } from 'react-toastify'

export default function MenuEditTable(props) {
    const [menu, setMenu] = useState(structuredClone(useLoaderData()["data"]["piatti"]))
    const [hasUpdated, setHasUpdated] = useState(false)
    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null

    let handleToggle = async (index) => {
        let r = await editPlate(menu[index]["_id"], menu[index]["nome"], menu[index]["prezzo"], menu[index]["categoria"], !menu[index]["disponibile"], menu[index]["descrizione"], menu[index]["allergeni"], menu[index]["ingredientiModificabili"])
        if (r["status"]) {
            toast.success(menu[index]["nome"] + " aggiornato")
            setMenu((await getMenu())["data"]["piatti"])
        } else {
            toast.error(menu[index]["nome"] + " non aggiornato")
        }
    }

    let handleAddPlate = async (data) => {
        data["allergeni"] = data["allergeni"].split(", ")
        data["ingredientiModificabili"] = data["ingredientiModificabili"].split(", ")
        let r = await insertPlate(data["nome"], data["prezzo"], data["categoria"], data["disponibile"], data["descrizione"], data["allergeni"], data["ingredientiModificabili"])
        if (r["status"]) {
            toast.success(data["nome"] + " aggiunto al menu")
            setMenu((await getMenu())["data"]["piatti"])
        } else {
            toast.error(data["nome"] + " non aggiunto al menu")
        }
    }

    let handleEditPlate = async (data) => {
        data["allergeni"] = data["allergeni"].split(", ")
        data["ingredientiModificabili"] = data["ingredientiModificabili"].split(", ")
        let r = await editPlate(data["_id"], data["nome"], data["prezzo"], data["categoria"], data["disponibile"], data["descrizione"], data["allergeni"], data["ingredientiModificabili"])
        if (r["status"]) {
            toast.success(data["nome"] + " aggiornato")
            setMenu((await getMenu())["data"]["piatti"])
        } else {
            toast.error(data["nome"] + " non aggiornato")
        }
    }

    let handleDeletePlate = async (index) => {
        let r = await deletePlate(menu[index]["_id"])
        if (r["status"]) {
            toast.success(menu[index]["nome"] + " eliminato")
            setMenu((await getMenu())["data"]["piatti"])
        } else {
            toast.error(menu[index]["nome"] + " non eliminato")
        }
    }

    let onSubmit = async (data) => {
        handleEditPlate(data, props.item)
    }

    function launchModal(modalId) {
        document.getElementById(modalId.concat("Button")).click()
    }

    const modals = menu.map((item, index) => {
        return (
            <EditPlateModal key={makeKey(index)} onSubmit={onSubmit} modalId="editMenuModal" item={item} index={index} />
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
    return (
        <>
            <h3 className='mt-4'>Modifica Menu</h3>
            {
                userType === "Manager" &&
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
            {
                userType === "Manager" &&
                <AddPlateModal onSubmit={handleAddPlate} modalId="addMenuModal" />
            }
            {
                userType === "Manager" &&
                modals
            }
        </>
    )
}