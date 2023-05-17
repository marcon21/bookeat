export default function LoginRoute() {
    let a = {
        "web": {
            "client_id": "596841181986-4mbjpaop1352i033dr72odthmkulvbr0.apps.googleusercontent.com",
            "project_id": "bookeat-386916",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_secret": "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",
            "redirect_uris": ["http://localhost:3001"],
            "javascript_origins": ["http://localhost:3001"]
        }
    }

    return (
        <>
            <script src="https://accounts.google.com/gsi/client" async defer></script>

            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="/logo.svg" alt="login form" className="img-fluid h-100" style={{ borderRadius: "1rem 0 0 1rem" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <span className="h1 fw-bold mb-0">BookEat</span>
                                                </div>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }} >Accedi al tuo account </h5>
                                                <div className="form-outline mb-4">
                                                    <input type="email" id="loginEmail" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="loginEmail">Indirizzo Email </label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="password" id="loginPassword" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="loginPassword">Password</label>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block" type="button" >Login </button>
                                                </div>
                                                <a className="small text-muted" href="#!">Forgot password?</a>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                                    Non hai ancora un account?{" "}
                                                    <a href="#!" style={{ color: "#393f81" }}>
                                                        Registrati
                                                    </a>
                                                </p>
                                            </form>
                                            <div className="container-fluid">
                                                <div id="g_id_onload"
                                                    data-client_id="596841181986-4mbjpaop1352i033dr72odthmkulvbr0.apps.googleusercontent.com"
                                                    data-context="use"
                                                    data-ux_mode="popup"
                                                    data-login_uri="http://localhost:3001"
                                                    data-auto_select="true"
                                                    data-itp_support="true">
                                                </div>

                                                <div className="g_id_signin"
                                                    data-type="standard"
                                                    data-shape="pill"
                                                    data-theme="outline"
                                                    data-text="continue_with"
                                                    data-size="large"
                                                    data-locale="it"
                                                    data-logo_alignment="left">
                                                </div>
                                            </div>
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