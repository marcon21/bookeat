import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from "react-router-dom"
import { deleteAccount, changeUsername, changePassword, userInfo, logout } from '../requests'
import { toast } from 'react-toastify'
import * as yup from "yup";

export async function loader() {
    const user = await userInfo()
    return user['data']['user']
}

export default function SettingsRoute() {
    const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))

    const [redirect, setRedirect] = useState(!isLoggedIn ? '/login' : false)
    const [defaultFormValues, setDefaultFormValues] = useState(structuredClone(useLoaderData()))

    let schema = yup.object().shape({
        nome: yup.string()
            .required("Username obbligatorio")
            .min(4, "L'username deve contenere almeno 4 caratteri")
            .max(24, "L'username non può contenere più di 24 caratteri")
            .matches(/^[a-zA-Z0-9_.]*$/, "L'username può contenere solo lettere, numeri, punti e underscore"),
        vecchiaPassword: yup.string(),
        nuovaPassword: yup.string()
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
            .oneOf([yup.ref("nuovaPassword")], "La password non corrisponde"),
    });

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        defaultValues: defaultFormValues
    });


    const [isEditing, setIsEditing] = useState(false)

    const onSubmit = async (data) => {
        if (data.nome !== defaultFormValues.nome) {
            let r2 = await changeUsername(data.nome)
            if (r2["status"]) {
                setIsEditing(false)
                toast.success("Username modificato con successo")
            } else {
                reset(defaultFormValues)
                toast.error(r2["message"])
            }
        }

        if (data.nuovaPassword !== "" && data.cpassword !== "" && data.vecchiaPassword !== "") {
            let r1 = await changePassword(data.vecchiaPassword, data.nuovaPassword)
            if (r1["status"]) {
                setIsEditing(false)
                toast.success("Password modificata con successo")
            } else {
                reset(defaultFormValues)
                toast.error(r1["message"])
            }
        }

        let tmp = structuredClone(await userInfo())
        delete tmp["password"]
        setDefaultFormValues(tmp)

    };

    if (isLoggedIn) {
        if (isEditing) {
            return (
                <section className="vh-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-11">
                            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                                <div className="card-body">
                                    <h2>Modifica:</h2>
                                    <form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <p className="font-label">Username:</p>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="form-outline mb-4">
                                                    <input type="text" className={"form-control form-control-lg".concat(errors.nome ? " is-invalid" : "")} id="nome" {...register('nome')} />
                                                    <div className="invalid-feedback">
                                                        {errors.nome?.message}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <p className="font-label">Vecchia Password:</p>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="form-outline mb-4">
                                                    <input type="password" className={"form-control form-control-lg".concat(errors.vecchiaPassword ? " is-invalid" : "")} id="vecchiaPassword" {...register('vecchiaPassword')} />
                                                    <div className="invalid-feedback">
                                                        {errors.vecchiaPassword?.message}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <p className="font-label">Nuova Password:</p>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="form-outline mb-4">
                                                    <input type="password" className={"form-control form-control-lg".concat(errors.nuovaPassword ? " is-invalid" : "")} id="nuovaPassword" {...register('nuovaPassword')} />
                                                    <div className="invalid-feedback">
                                                        {errors.nuovaPassword?.message}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <p className="font-label">Conferma nuova Password:</p>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="form-outline mb-4">
                                                    <input type="password" className={"form-control form-control-lg".concat(errors.cpassword ? " is-invalid" : "")} id="cpassword" {...register('cpassword')} />
                                                    <div className="invalid-feedback">
                                                        {errors.cpassword?.message}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button id='editProfileSubmit' type="submit" hidden={true}>submit</button>
                                    </form>
                                    <h2>Elimina Account:</h2>
                                    <div className="row mt-3">
                                        <div className="col-md-3">
                                            <p className="font-label">Password Attuale:</p>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="input-group">
                                                <input type="password" id="passwordElimina" className="form-control" aria-label="Password attuale" aria-describedby="button-addon2" />
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
                                        <div className="col-md-1"></div>
                                        <div className="col-md-1 mt-4 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0 mt-sm-4 d-flex justify-content-end">
                                            <div className="btn-group-vertical">

                                                <button className='btn btn-outline-success' onClick={() => { document.getElementById('editProfileSubmit').click() }}><i className='bi bi-check fs-4'></i></button>
                                                <button className='btn btn-outline-light' onClick={() => setIsEditing(false)}><i className='bi bi-arrow-left fs-4'></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            )
        } else {
            return (
                //dati solo visulizzazione
                <>
                    {redirect && <Navigate to={redirect} />}
                    <section className="vh-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-10">
                                <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                                    <div className="card-body">
                                        <h2>I tuoi Dati:</h2>
                                        <div className="row mt-3">
                                            <div className="col-md-3">
                                                <p className="font-label">Username:</p>
                                            </div>
                                            <div className="col-md-9">
                                                <p>{defaultFormValues.nome}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <p className="font-label">Email:</p>
                                            </div>
                                            <div className="col-md-8">
                                                <p>{defaultFormValues.email}</p>
                                            </div>
                                            <div className="col-md-1 d-flex justify-content-end">
                                                <div className="btn-group-vertical">
                                                    <button className='btn btn-outline-light' onClick={() => setIsEditing(true)}><i className='bi bi-pencil fs-4'></i></button>
                                                    {/* conditional rendering if not contain /dashboard/settings in route path */}
                                                    {!window.location.pathname.includes('/dashboard/settings') &&
                                                        <button className='btn btn-outline-light' onClick={() => setRedirect('/')}><i className='bi bi-arrow-left fs-4'></i></button>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row g-0">
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
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


