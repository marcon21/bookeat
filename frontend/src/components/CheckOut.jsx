export default function CheckOut({ checkoutList }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Quantità</th>
                        <th>Prezzo</th>
                        <th>Prezzo totale</th>
                    </tr>
                </thead>
                <tbody>
                    {checkoutList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item['nome']}</td>
                                <td>{item['quantita']}</td>
                                <td>{item['prezzo']}</td>
                                <td>{item['prezzo'] * item['quantita']}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}