export default function PlateSpecs({ plate }) {
    return (
        <div className="modal-body">
            <div className="row">
                <div className="col-md-6">
                    <img src={dish.img} className="img-fluid" alt={dish.nome} />
                </div>
                <div className="col-md-6">
                    <h4 className="modal-title">{dish.nome}</h4>
                    <p><strong>Prezzo:</strong> {dish.prezzo}</p>
                    <p><strong>Categoria:</strong> {dish.categoria.primaria}</p>
                    <p><strong>Descrizione:</strong> {dish.descrizione}</p>
                    <p><strong>Allergeni:</strong> {dish.allergeni.join(', ')}</p>
                    <p><strong>Ingredienti modificabili:</strong></p>
                    {dish.ingredientiModificabili.map((ingrediente, index) => (
                        <div className="form-check" key={index}>
                            <input className="form-check-input" type="checkbox" id={`${ingrediente}Checkbox`} />
                            <label className="form-check-label" htmlFor={`${ingrediente}Checkbox`}>{ingrediente}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}