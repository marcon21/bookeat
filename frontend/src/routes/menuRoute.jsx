import { useLoaderData } from "react-router-dom";

import LateralBar from "../components/LateralBar";
import MenuSections from "../components/MenuSections";
import NavBar from "../components/Navbar";

import { getMenu } from "../requests";

export async function loader() {
    const menu = await getMenu()
    // const lateralBarProp = menu.map((item, index) => {

    // })
    return menu
}

export default function MenuRoute() {
    return (
        <>
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <LateralBar />
                </div>
                <div className="col-auto col-md-9 col-xl-10 px-sm-10">
                    <div className="row">
                        <NavBar label={"Nome"} />
                    </div>
                    <div className="row ms-2 me-2">
                        <MenuSections />
                    </div>
                </div>

            </div>
        </>

    )
}