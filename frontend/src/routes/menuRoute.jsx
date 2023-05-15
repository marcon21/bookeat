import LateralBar from "../components/LateralBar";


export default function MenuRoute() {
    let list = {
        menu: {
            primi: {
                primo1: "da",
            },
        },
    }
    return (
        <>
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <LateralBar />
                </div>
                <div className="col py-3">
                    Content area...
                    <div className="row row-md-2 bg-info">
                        <div className="sticky">
                            {/*NavBar*/}
                            <button type="button" className="btn btn-primary">Primary</button>
                            <p>ciao</p>
                        </div>
                    </div>

                    <div className="container-fluid row">
                        <div className="sticky">
                            {/*Menu Body*/}
                            <button type="button" className="btn btn-primary">Primary</button>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}