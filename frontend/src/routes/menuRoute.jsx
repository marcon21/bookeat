import LateralBar from "../components/LateralBar";
import MenuSections from "../components/MenuSections";
import NavBar from "../components/Navbar";


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
                <div className="col-auto col-md-9 col-xl-10 px-sm-10">
                    <div className="row">
                        <NavBar label={"Nome"}/>
                    </div>
                    <div className="row ms-2 me-2">
                        <MenuSections />
                    </div>
                </div>

            </div>
        </>

    )
}