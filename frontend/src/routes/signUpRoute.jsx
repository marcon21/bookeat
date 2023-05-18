import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

export default function SignUpRoute() {
    const formSchema = yup.object().shape({
        email: yup.string()
            .required("L'email è richiesta")
            .email("L'email deve essere valida"),
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
        getValues
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    })
    // const { register, formState: { errors }, handleSubmit } = useForm()
    const onSubmit = data => console.log(data)

    return (
        <>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="/logo.svg" alt="signup form" className="img-fluid h-100" style={{ borderRadius: "1rem 0 0 1rem" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <span className="h1 fw-bold mb-0">BookEat</span>
                                                </div>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }} >Registrati</h5>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="signupEmail">Indirizzo Email </label>
                                                    <input {...register("email")} type="email" id="signupEmail" className={"form-control form-control-lg".concat(errors.email ? " is-invalid" : "")} />
                                                    <div className="invalid-feedback">
                                                        {errors.email?.message}
                                                    </div>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="signupPassword">Password</label>
                                                    <input {...register("password")} type="password" id="signupPassword" className={"form-control form-control-lg".concat(errors.password ? " is-invalid" : "")} />
                                                    <div className="invalid-feedback">
                                                        {errors.password?.message}
                                                    </div>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="signupPasswordConfirm">Conferma Password</label>
                                                    <input {...register("cpassword")} type="password" id="signupPasswordConfirm" className={"form-control form-control-lg".concat(errors.cpassword ? " is-invalid" : "")} />
                                                    <div className="invalid-feedback">
                                                        {errors.cpassword?.message}
                                                    </div>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block" type="submit" >Registrati</button>
                                                </div>
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
}