export default function MenuRoute() {
    return (
        <>
            <div className="container-fluid">
                <div className="row h-100">
                    <div className="col col-md-2 bg-light">
                        <div className="sticky">
                            {/*Lateral Bar*/}
                            <button type="button" className="btn btn-primary">Primary</button>
                            <p>ciao</p>
                        </div>
                    </div>

                    <div className="col col-md-10 bg-dark">
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
            </div>
        </>
        
    )
}