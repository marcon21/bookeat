import { useState } from 'react'
import { getMenu, insertPlate, editPlate, deletePlate } from '../requests'
import { Navigate, useLoaderData } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { makeKey } from '../utils'
import Modal from '../components/Modal'

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
        // let r = await editPlate(menu[index]["_id"], menu[index]["nome"], menu[index]["prezzo"], menu[index]["categoria"], !menu[index]["disponibile"], menu[index]["descrizione"], menu[index]["allergeni"], menu[index]["ingredientiModificabili"])
        // if (r["status"] === "success") {
        //     // let menuCopy = structuredClone(menu)
        //     // menuCopy[index]["disponibile"] = !menuCopy[index]["disponibile"]
        //     // setMenu(menuCopy)
        //     // setMenu((await getMenu())["data"]["piatti"])
        // }
    }

    function launchModal(modalId) {
        document.getElementById(modalId.concat("Button")).click()
    }

    const modals = menu.map((item, index) => {
        let schema = yup.object().shape({
            nome: yup.string().required("Nome obbligatorio"),
            prezzo: yup.number().required("Prezzo obbligatorio").positive("Prezzo deve essere positivo").integer("Prezzo deve essere un numero intero"),
            categoria: yup.object().shape({
                primaria: yup.string().required("Categoria primaria obbligatoria"),
                secondaria: yup.string()
            }),
            disponibile: yup.boolean().required("Disponibilità obbligatoria"),
            descrizione: yup.string().required("Descrizione obbligatoria"),
            allergeni: yup.array().of(yup.string()),
            ingredientiModificabili: yup.array().of(yup.string())
        });

        let { register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(schema),
            defaultValues: {
                nome: item["nome"],
                prezzo: item["prezzo"],
                categoria: item["categoria"],
                disponibile: item["disponibile"],
                descrizione: item["descrizione"],
                allergeni: item["allergeni"],
                ingredientiModificabili: item["ingredientiModificabili"]
            },
        });

        let onSubmit = async (data) => {
            console.log(data)
        }

        return (
            <Modal
                key={makeKey(index)}
                modalId={"editMenuModal-" + index}
                title={"Modifica piatto"}
                closeButtonText="Chiudi"
                confirmButtonText="Conferma modifica"
                closeFunction={() => { console.log("close") }}
                confirmFunction={() => { document.getElementById("formSubmitButton-" + index).click() }}
                showButtons={true}
            >
                <div className="modal-body">
                    <form id={"editMenuForm-" + index} onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" {...register('nome')} />
                            <p className="text-danger">{errors.nome?.message}</p>
                        </div>
                        <div className="row">
                            <label htmlFor="prezzo">Prezzo in centesimi (1000 = 10€)</label>
                            <input type="number" className="form-control" id="prezzo" {...register('prezzo')} />
                            <p className="text-danger">{errors.prezzo?.message}</p>
                        </div>
                        <div className="row">
                            <label htmlFor="categoria.primaria">Categoria primaria</label>
                            <input type="text" className="form-control" id="categoria.primaria" {...register('categoria.primaria')} />
                            <p className="text-danger">{errors.categoria?.primaria?.message}</p>
                        </div>
                        <div className="row">
                            <label htmlFor="categoria.secondaria">Categoria secondaria</label>
                            <input type="text" className="form-control" id="categoria.secondaria" {...register('categoria.secondaria')} />
                            <p className="text-danger">{errors.categoria?.secondaria?.message}</p>
                        </div>
                        <div className="row">
                            <label htmlFor="descrizione">Descrizione</label>
                            <input type="text" className="form-control" id="descrizione" {...register('descrizione')} />
                            <p className="text-danger">{errors.descrizione?.message}</p>
                        </div>
                        <div className="row">
                            <label htmlFor="allergeni">Allergeni</label>
                            <input type="text" className="form-control" id="allergeni" {...register('allergeni')} />
                            <p className="text-danger">{errors.allergeni?.message}</p>
                        </div>
                        <div className="row">
                            <label htmlFor="ingredientiModificabili">Ingredienti modificabili</label>
                            <input type="text" className="form-control" id="ingredientiModificabili" {...register('ingredientiModificabili')} />
                            <p className="text-danger">{errors.ingredientiModificabili?.message}</p>
                        </div>
                        <div className="row">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="disponibile" {...register('disponibile')} />
                                <label className="form-check-label" htmlFor="disponibile">Disponibile</label>
                                <p className="text-danger">{errors.disponibile?.message}</p>
                            </div>
                        </div>
                        <button hidden={true} type="submit" id={"formSubmitButton-" + index}></button>
                    </form>
                </div>
            </Modal>
        )
    })

    const items = menu.map((item, index) => {
        return (
            <tr key={makeKey(index)}>
                <td>
                    <button type="button" className="btn btn-outline-dark" onClick={() => { launchModal("editMenuModal-" + index) }} ><i className='bi bi-pencil'></i></button>
                </td>
                <td>
                    {item["disponibile"] ?
                        <button type="button" className="btn btn-success" onClick={() => { handleToggle(index) }} ><i className='bi bi-check'></i></button> :
                        <button type="button" className="btn btn-danger" onClick={() => { handleToggle(index) }} ><i className='bi bi-x'></i></button>
                    }
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
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col"></th>
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
                {modals}
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