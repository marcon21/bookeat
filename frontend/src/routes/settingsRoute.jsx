import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from "react-router-dom"
import { deleteAccount, changeUsername, changePassword, userInfo, logout } from '../requests'
import { toast } from 'react-toastify'
import * as yup from "yup";

export async function loader() {
    const user = await userInfo()
    console.log(user)
    // let user = { "_id": "647dd95b0fc0acd4877f4325", "email": "mario.rossi@gmail.com", "password": "$2b$10$bS8qo.itTTWHf/nPhjkuv.d4t/AIU/I138VE7w/sLdPauha9ZtvJ.", "nome": "Mario", "userType": "Manager", "googleId": "", "__v": 0 }
    return user['data']['user']
}

export default function SettingsRoute() {
    const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))

    const [redirect, setRedirect] = useState(!isLoggedIn ? '/login' : false)

    let schema = yup.object().shape({
        nome: yup.string()
            .required("Username obbligatorio")
            .min(4, "L'username deve contenere almeno 4 caratteri")
            .max(24, "L'username non può contenere più di 12 caratteri")
            .matches(/^[a-zA-Z0-9_.]*$/, "L'username può contenere solo lettere, numeri, punti e underscore"),
        email: yup.string().required("Email obbligatoria").email("L'email deve essere valida"),
        vecchiaPassword: yup.string()
            .required("La password è richiesta"),
        nuovaPassword: yup.string()
            .required("La password è richiesta")
            .min(4, "La password deve contenere almeno 4 caratteri")
            .max(12, "La password non può contenere più di 12 caratteri")
            .matches(/(?=.*[0-9])/, "La password deve contenere almeno un numero")
            .matches(/(?=.*[a-z])/, "La password deve contenere almeno una lettera minuscola")
            .matches(/(?=.*[A-Z])/, "La password deve contenere almeno una lettera maiuscola")
            .matches(/(?=.*[!@#$%^&*])/, "La password deve contenere almeno un carattere speciale tra !@#$%^&*")
            .test("password-diverse", "La vecchia password e la nuova password devono essere diverse", function (value) {
                return value !== this.resolve(yup.ref("vecchiaPassword"));
            }),
        cpassword: yup.string()
            .required("La conferma della password è richiesta")
            .oneOf([yup.ref("nuovaPassword")], "La password non corrisponde"),
    });

    //const userLoaderData = useLoaderData(); // Get the data from the loader
    //delete useLoaderData.password //non funziona perchè non è oggetto ma variabile passata
    const defaultFormValues = structuredClone(useLoaderData()); // Get the data from the loader
    delete defaultFormValues["password"]
    //const { password, ...userData } = defaultFormValues;

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultFormValues
    });


    const [isEditing, setIsEditing] = useState(false)

    const onSubmit = async (data) => {
        let r1 = await changePassword(data.vecchiaPassword, data.nuovaPassword)
        let r2 = await changeUsername(data.nome)
        if (r1["status"] && r2["status"]) {
            setIsEditing(false)
            toast.success("Account modificato con successo")
            defaultFormValues = await userInfo()
            delete defaultFormValues["password"]
        } else {
            reset()
            toast.error("Errore nella modifica account")
        }
    };

    if (isLoggedIn) {
        if (isEditing) {
            return (
                <>
                    <section className="vh-100 bg-white">
                        <div className="container py-5 h-100 ">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col col-xl-10">
                                    <a className="nav-link px-3" role="button" onClick={() => setIsEditing(false)}>
                                        <i className='bi bi-arrow-left-circle-fill fs-4 bg-light'></i>
                                    </a>
                                    <div className="card bg-dark" style={{ borderRadius: "1rem" }}>
                                        <div className="row g-0">
                                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                                <div className="card-body p-4 p-lg-5 text-white">
                                                    <h2>Modifica i tuoi Dati:</h2>
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="row">
                                                            <label htmlFor="nome">Username</label>
                                                            <input type="text" className="form-control" id="nome" {...register('nome')} />
                                                            <p className="text-danger">{errors.nome?.message}</p>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="vecchiaPassword">Vecchia Password</label>
                                                            <input type="password" className="form-control" id="vecchiaPassword" {...register('vecchiaPassword')} />
                                                            <p className="text-danger">{errors.password?.message}</p>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="nuovaPassword">Nuova Password</label>
                                                            <input type="password" className="form-control" id="nuovaPassword" {...register('nuovaPassword')} />
                                                            <p className="text-danger">{errors.password?.message}</p>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="cpassword">Conferma Password</label>
                                                            <input type="password" className="form-control" id="cpassword" {...register('cpassword')} />
                                                            <p className="text-danger">{errors.cpassword?.message}</p>
                                                        </div>
                                                        <div className="btn-group">
                                                            <button className='btn btn-danger' type="button" >Elimina Account</button>
                                                            <button className='btn btn-light' type="submit" >Conferma modifica</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-group mb-3">
                                                <input type="password" id="passwordElimina" className="form-control" placeholder="Password attuale" aria-label="Password attuale" aria-describedby="button-addon2" />
                                                <button className="btn btn-outline-danger" type="button" id="button-addon2" onClick={
                                                    async () => {
                                                        let password = document.getElementById("passwordElimina").value
                                                        let r = await deleteAccount(password)
                                                        if (r["status"]) {
                                                            toast.success("Account Eliminato")
                                                            await logout()
                                                            setRedirect("/")
                                                        } else {
                                                            toast.error("Errore nell'eliminazione")
                                                        }
                                                    }
                                                }>Elimina Account</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )
        } else {
            return (
                //dati solo visulizzazione
                <>
                    {redirect && <Navigate to={redirect} />}
                    <section className="vh-100 bg-white">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <a className="nav-link px-3" role="button" onClick={() => {
                                    setRedirect('/')
                                }}>
                                    <i className='bi bi-arrow-left-circle-fill fs-4 bg-light'></i>
                                </a>
                                <div className="card bg-dark" style={{ borderRadius: "1rem" }}>
                                    <div className="row g-0">
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div className="card-body p-4 p-lg-5 text-white">
                                                <h2>I tuoi Dati:</h2>
                                                <div className="row">
                                                    <p className="font-label">Username:</p>
                                                    <p>{defaultFormValues.nome}</p>
                                                </div>
                                                <div className="row">
                                                    <p className="font-label">Email:</p>
                                                    <p>{defaultFormValues.email}</p>
                                                </div>
                                                <button className='btn btn-light' onClick={() => setIsEditing(true)}>Modifica</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                </>
            )
        }
    } else {
        return (
            <>
                {redirect && <Navigate to={redirect} />}
            </>
        )
    }
}


