import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from "react-router-dom"
import { userInfo } from '../requests'
import * as yup from "yup";

export async function loader() {
    // const user = await userInfo()['data']['user']
    let user = { "_id": "647dd95b0fc0acd4877f4325", "email": "mario.rossi@gmail.com", "password": "$2b$10$bS8qo.itTTWHf/nPhjkuv.d4t/AIU/I138VE7w/sLdPauha9ZtvJ.", "usernome": "Mario", "userType": "Manager", "googleId": "", "__v": 0 }
    return user
}

export default function SettingsRoute() {
    const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))

    const [redirect, setRedirect] = useState(!isLoggedIn ? '/login' : false)

    let schema = yup.object().shape({
        usernome: yup.string()
            .required("Username obbligatorio")
            .min(4, "L'username deve contenere almeno 4 caratteri")
            .max(12, "L'username non può contenere più di 12 caratteri")
            .matches(/^[a-zA-Z0-9_.]*$/, "L'username può contenere solo lettere, numeri, punti e underscore"),
        email: yup.string().required("Email obbligatoria").email("L'email deve essere valida"),
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

    });

    //const userLoaderData = useLoaderData(); // Get the data from the loader
    //delete useLoaderData.password //non funziona perchè non è oggetto ma variabile passata
    const userLoaderData = useLoaderData(); // Get the data from the loader
    const { password, ...userData } = userLoaderData;

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: userData
    });


    const [isEditing, setIsEditing] = useState(false)

    const onSubmit = (data) => {
        // Handle form submission
    };

    if (isLoggedIn) {
        if (isEditing) {
            return (
                <>
                    <section className="vh-100 bg-dark">
                        <div className="container py-5 h-100 ">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col col-xl-10">
                                    <a className="nav-link px-3" role="button" onClick={() => setIsEditing(false)}>
                                        <i className='bi bi-arrow-left-circle-fill fs-4 bg-light'></i>
                                    </a>
                                    <div className="card" style={{ borderRadius: "1rem" }}>
                                        <div className="row g-0">
                                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                                <div className="card-body p-4 p-lg-5 text-black">
                                                    <h2>Modifica i tuoi Dati:</h2>
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="row">
                                                            <label htmlFor="usernome">Username</label>
                                                            <input type="text" className="form-control" id="nome" {...register('usernome')} />
                                                            <p className="text-danger">{errors.usernome?.message}</p>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="email">Email</label>
                                                            <input type="text" className="form-control" id="nome" {...register('email')} />
                                                            <p className="text-danger">{errors.email?.message}</p>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="password">Nuova Password</label>
                                                            <input type="password" className="form-control" id="nome" {...register('password')} />
                                                            <p className="text-danger">{errors.password?.message}</p>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="cpassword">Conferma Password</label>
                                                            <input type="password" className="form-control" id="nome" {...register('cpassword')} />
                                                            <p className="text-danger">{errors.cpassword?.message}</p>
                                                        </div>
                                                        <button type="submit">Conferma modifica</button>
                                                    </form>
                                                </div>
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
                    <section className="vh-100 bg-dark">
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col col-xl-10">
                                    <a className="nav-link px-3" role="button" onClick={() => {
                                        setRedirect('/')
                                    }}>
                                        <i className='bi bi-arrow-left-circle-fill fs-4 bg-light'></i>
                                    </a>
                                    <div className="card" style={{ borderRadius: "1rem" }}>
                                        <div className="row g-0">
                                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                                <div className="card-body p-4 p-lg-5 text-black">
                                                    <h2>I tuoi Dati:</h2>
                                                    <div className="row">
                                                        <p className="font-label">Username:</p>
                                                        <p>{userData.usernome}</p>
                                                    </div>
                                                    <div className="row">
                                                        <p className="font-label">Email:</p>
                                                        <p>{userData.email}</p>
                                                    </div>
                                                    <button onClick={() => setIsEditing(true)}>Modifica</button>
                                                </div>
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


