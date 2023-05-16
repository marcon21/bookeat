import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import LateralBar from "../components/LateralBar";
import MenuSections from "../components/MenuSections";
import NavBar from "../components/Navbar";

import { getMenu } from "../requests";

export async function loader() {
    const menu = await getMenu()
    return menu
}

export default function MenuRoute() {
    const [filter, setFilter] = useState([0, 0])

    return (
        <>
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <LateralBar list={useLoaderData()['placement']} />
                </div>
                <div className="col-auto col-md-9 col-xl-10 px-sm-10">
                    <div className="row">
                        <NavBar label={"Nome"} />
                    </div>
                    <div className="row ms-2 me-2">
                        <MenuSections menu={useLoaderData()} filter={filter} />
                    </div>
                </div>

            </div>
        </>

    )
}