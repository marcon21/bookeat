import { useState } from "react"
import { Navigate } from "react-router-dom"
import { makeKey } from "../utils"
import { sendOrder } from "../requests"
import { toast } from "react-toastify"

export default function CheckOutRoute() {
    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null
    let isUser = userType === "UtenteLoggato"
    let checkout = localStorage.getItem("checkout")
    let isCheckoutEmpty = checkout === null || JSON.parse(checkout).length === 0

    const [redirect, setRedirect] = useState(isUser && !isCheckoutEmpty ? false : "/")
    const minHour = 12
    const maxHour = 14.75
    const [selectedHour, setSelectedHour] = useState(minHour)

    const handleHourSelection = (hour) => {
        setSelectedHour(hour);
    };

    const renderHourMarkers = () => {
        const hours = [];
        for (let i = 0; i < (maxHour - minHour); i++) {
            let row = [];
            for (let j = 0; j < 4; j++) {
                const hour = (minHour + i) + 0.25 * j;
                row.push(
                    <div
                        key={makeKey(i)}
                        className={`hour-marker ${selectedHour === hour ? 'selected' : ''}`}
                        onClick={() => handleHourSelection(hour)}
                    >
                        {formatHour(hour)}
                    </div>
                );
            }
            hours.push(
                <div key={makeKey(i)} className="row">
                    <div className="col">
                        {row}
                    </div>
                </div>
            )
        }
        return hours;
    };

    const formatHour = (hour) => {
        const hourString = Math.floor(hour).toString().padStart(2, '0');
        const minuteString = Math.floor((hour * 100) % 100) === 25 ? '15' : Math.floor((hour * 100) % 100) === 50 ? '30' : Math.floor((hour * 100) % 100) === 75 ? '45' : '00';
        return `${hourString}:${minuteString}`;
    };


    if (isUser && !isCheckoutEmpty) {
        return (
            <>
                {redirect && <Navigate to={redirect} />}
                <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                    <div className="card">
                        <div className="card-body">

                            <div className="row">
                                <div className="col-md-6  mt-3 mb-3">
                                    <h1>Carrello</h1>
                                    <div className="card mt-3">
                                        <div className="list-group list-group-flush">
                                            {JSON.parse(checkout).map((item, index) => {
                                                return (
                                                    <div key={makeKey(index)} className="list-group-item">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h5 className="card-title">{item['nome']}</h5>
                                                                <h6 className="card-subtitle mb-2 text-body-secondary">{(item["prezzo"] / 100).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</h6>
                                                                <p className="card-text">{item['note']}</p>
                                                            </div>
                                                            <div className="col-4">
                                                                {item['ingredientiScelti'].map((ingrediente, index) => {
                                                                    return (
                                                                        <div key={makeKey(index)}>
                                                                            <span>{ingrediente} </span>
                                                                            <br />
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <h4 className="mt-4">Totale: {(JSON.parse(checkout).reduce((acc, item) => acc + item["prezzo"], 0) / 100).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</h4>
                                </div>
                                <div className="col-md-6 mt-3 mb-3">
                                    <h1>Orario</h1>
                                    <label htmlFor="hour" className="form-label">
                                        Seleziona un orario di ritiro
                                    </label>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min={minHour}
                                        max={maxHour}
                                        step="0.25"
                                        id="hour"
                                        value={selectedHour}
                                        onChange={(e) => handleHourSelection(parseFloat(e.target.value))}
                                    />
                                    <div className="d-flex justify-content-center mt-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="hour-selector">{renderHourMarkers()}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button className="btn btn-dark" onClick={async () => {
                                            let checkoutCopy = structuredClone(JSON.parse(checkout))
                                            checkoutCopy.forEach((item) => {
                                                delete item["nome"]
                                                delete item["prezzo"]
                                                item["idPiatto"] = item["_id"]
                                                delete item["_id"]
                                                // rename key priorita to prioritá
                                                // item["prioritá"] = item["priorita"]
                                                // delete item["priorita"]
                                            })
                                            let rt = await sendOrder(checkoutCopy)
                                            let promiseApi = new Promise((resolve, reject) => {
                                                if (rt["status"]) {
                                                    resolve(rt)
                                                } else {
                                                    reject(rt)
                                                }
                                            })
                                            await toast.promise(promiseApi, {
                                                pending: {
                                                    render({ data }) {
                                                        return "Invio ordine in corso..."
                                                    }
                                                },
                                                success: {
                                                    render({ data }) {
                                                        localStorage.removeItem("checkout")
                                                        return "Ordine Confermato per le ore " + formatHour(selectedHour)
                                                    }
                                                },
                                                error: "Errore: " + rt["message"]
                                            })
                                            .then((res) => {
                                                if (res["status"]) {
                                                    localStorage.removeItem("checkout")
                                                    setRedirect("/")
                                                }
                                            })
                                            .catch((err) => { })
                                        }}>Procedi al Pagamento</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                {redirect && <Navigate to={redirect} />}
            </>
        )
    }
}