import { useState } from 'react'
import { Navigate, useLoaderData } from 'react-router-dom'
import { makeKey } from '../utils'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import FormFieldsManager from '../components/FormFieldsManager'

export async function loader() {
    // let staff = await getStaff()
    let staff = [
        {
            "name": "Mario",
            "surname": "Rossi",
            "role": "Sala",
            "email": "mario.rossi@gmail.com",
            "username": "mario.rossi",
            "password": "password"
        },
        {
            "name": "Luigi",
            "surname": "Verdi",
            "role": "Cucina",
            "email": "luigi.verdi@gmail.com",
            "username": "luigi.verdi",
            "password": "password"
        },
        {
            "name": "Giovanni",
            "surname": "Bianchi",
            "role": "Manager",
            "email": "giovanni.bianchi@gmail.com",
            "username": "giovanni.bianchi",
            "password": "password"
        }
    ]
    return staff
}

export default function StaffRoute() {
    // users ENUM: UtenteLoggato, Tavolo, Sala, Cucina, Manager
    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null

    const [redirect, setRedirect] = useState(userType === "Manager" ? false : "/")
    const [staff, setStaff] = useState(useLoaderData())
    const [staffSelected, setStaffSelected] = useState(null)
    const [formFields, setFormFields] = useState(null)
    function onFormFieldChange(fields) {
        setFormFields(fields)
        reset(fields)
    }

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Il nome è richiesto")
            .min(2, "Il nome deve contenere almeno 2 caratteri")
            .max(12, "Il nome non può contenere più di 12 caratteri")
            .matches(/^[a-zA-Z]*$/, "Il nome può contenere solo lettere"),
        surname: yup.string()
            .required("Il cognome è richiesto")
            .min(2, "Il cognome deve contenere almeno 2 caratteri")
            .max(12, "Il cognome non può contenere più di 12 caratteri")
            .matches(/^[a-zA-Z]*$/, "Il cognome può contenere solo lettere"),
        role: yup.string()
            .required("Il ruolo è richiesto")
            .oneOf(["Sala", "Cucina", "Manager"], "Il ruolo deve essere Sala, Cucina o Manager"),
        email: yup.string()
            .required("L'email è richiesta")
            .email("L'email deve essere valida"),
        username: yup.string()
            .required("L'username è richiesto")
            .min(4, "L'username deve contenere almeno 4 caratteri")
            .max(12, "L'username non può contenere più di 12 caratteri")
            .matches(/^[a-zA-Z0-9_.]*$/, "L'username può contenere solo lettere, numeri, punti e underscore"),
        password: yup.string()
            .required("La password è richiesta")
            .min(4, "La password deve contenere almeno 4 caratteri")
            .max(12, "La password non può contenere più di 12 caratteri")
            .matches(/(?=.*[0-9])/, "La password deve contenere almeno un numero")
            .matches(/(?=.*[a-z])/, "La password deve contenere almeno una lettera minuscola")
            .matches(/(?=.*[A-Z])/, "La password deve contenere almeno una lettera maiuscola")
            .matches(/(?=.*[!@#$%^&*])/, "La password deve contenere almeno un carattere speciale tra !@#$%^&*"),
        cpassword: yup.string()
            .required("La conferma della password è richiesta")
            .oneOf([yup.ref("password")], "La password non corrisponde"),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        getValues,
        defaultValues
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema),
        defaultValues: formFields
    })

    const onSubmit = async (data) => {
        console.log(data)
        if (staffSelected !== null) {
            // let r = await updateStaff(data)
            // if (r["status"]) {
            //     setStaff(await getStaff())
            // }
            let tmp = structuredClone(staff)
            delete data.cpassword
            tmp[staffSelected] = data
            setStaff(tmp)
        } else {
            // let r = await createStaff(data)
            // if (r["status"]) {
            //     setStaff(await getStaff())
            // }
            let tmp = structuredClone(staff)
            delete data.cpassword
            tmp.push(data)
            setStaff(tmp)
        }
        setStaffSelected(null)
        reset(formFields)
    }

    let handleEdit = (index) => {
        setStaffSelected(index)
    }

    let handleDelete = async (index) => {
        // let r = await deleteStaff(index)
        // if (r["status"]) {
        //     setStaff(await getStaff())
        // }
        let tmp = structuredClone(staff)
        tmp.splice(index, 1)
        setStaff(tmp)
    }

    if (userType === "Manager") {
        return (
            <>
                {redirect && <Navigate to={redirect} />}
                <FormFieldsManager
                    onFormFieldChange={onFormFieldChange}
                    formFieldsEmpty={{
                        name: "",
                        surname: "",
                        role: "",
                        email: "",
                        username: "",
                        password: "",
                        cpassword: ""
                    }}
                    indexToLoad={staffSelected}
                />
                <div className="row mt-4">
                    <div className="col-8">
                        <h3>{staffSelected !== null ? "Modifica Staff" : "Aggiungi Staff"}</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="btn-group mt-3 mb-3">
                                <button type="submit" className="btn btn-outline-success">{staffSelected === null ? "Crea" : "Aggiorna"}</button>
                                {staffSelected !== null && <button type="button" className="btn btn-outline-danger" onClick={() => { setStaffSelected(null) }}>Chiudi</button>}
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="name" className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="name" {...register("name")} />
                                    <div className="form-text text-danger">{errors.name?.message}</div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="surname" className="form-label">Cognome</label>
                                    <input type="text" className="form-control" id="surname" {...register("surname")} />
                                    <div className="form-text text-danger">{errors.surname?.message}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="role" className="form-label">Ruolo</label>
                                    <select className="form-select" id="role" {...register("role")}>
                                        <option value="Sala">Sala</option>
                                        <option value="Cucina">Cucina</option>
                                        <option value="Manager">Manager</option>
                                    </select>
                                    <div className="form-text text-danger">{errors.role?.message}</div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" {...register("username")} />
                                    <div className="form-text text-danger">{errors.username?.message}</div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" {...register("email")} />
                                    <div className="form-text text-danger">{errors.email?.message}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" {...register("password")} />
                                    <div className="form-text text-danger">{errors.password?.message}</div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cpassword" className="form-label">Conferma Password</label>
                                    <input type="password" className="form-control" id="cpassword" {...register("cpassword")} />
                                    <div className="form-text text-danger">{errors.cpassword?.message}</div>
                                </div>
                            </div>
                        </form>
                    </div >
                    <div className="col-4">
                        <h3>Staff</h3>
                        <div className="list-group">
                            {staff.length === 0 && <div className="list-group-item">Nessun utente</div>}
                            {staff.map((user, index) => {
                                return (
                                    <div key={makeKey(index)} className="list-group-item">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <div className="btn-group-vertical" role="group">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => { handleDelete(index) }}><i className='bi bi-x'></i></button>
                                                    <button type="button" className="btn btn-outline-dark" onClick={() => { handleEdit(index) }} ><i className='bi bi-pencil'></i></button>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <h5 className="card-title">{user['name']} {user['surname']}</h5>
                                                <h6 className="card-subtitle mb-2 text-body-secondary">{user['role']}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div >
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