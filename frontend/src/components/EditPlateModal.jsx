import Modal from './Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export default function EditPlateModal({ onSubmit, item, index, modalId = "editPlateModal" }) {
    let schema = yup.object().shape({
        nome: yup.string().required("Nome obbligatorio"),
        prezzo: yup.number().required("Prezzo obbligatorio").positive("Prezzo deve essere positivo").integer("Prezzo deve essere un numero intero"),
        categoria: yup.object().shape({
            primaria: yup.string().required("Categoria primaria obbligatoria"),
            secondaria: yup.string()
        }),
        disponibile: yup.boolean().required("Disponibilità obbligatoria"),
        descrizione: yup.string().required("Descrizione obbligatoria"),
        allergeni: yup.string(),
        ingredientiModificabili: yup.string()
    });

    let { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nome: item["nome"],
            prezzo: item["prezzo"],
            categoria: item["categoria"],
            disponibile: item["disponibile"],
            descrizione: item["descrizione"],
            allergeni: item["allergeni"].join(", "),
            ingredientiModificabili: item["ingredientiModificabili"].join(", ")
        },
    });

    return (
        <Modal
            modalId={modalId + "-" + index}
            title={"Modifica piatto"}
            closeButtonText="Chiudi"
            confirmButtonText="Conferma modifica"
            closeFunction={() => { console.log("close") }}
            confirmFunction={() => { document.getElementById(modalId + "-formSubmitButton-" + index).click() }}
            showButtons={true}
        >
            <div className="modal-body">
                <form id={modalId + "-editMenuForm-" + index} onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" className="form-control" id="nome" {...register('nome')} />
                        <p className="text-danger">{errors.nome?.message}</p>
                    </div>
                    <div className="row">
                        <label htmlFor="prezzo">Prezzo in centesimi (1000 = 10€)</label>
                        <input type="number" className="form-control" id="prezzo" {...register('prezzo')} />
                        <p className="text-danger">{errors.prezzo?.message}</p>
                    </div>
                    <div className="row">
                        <label htmlFor="categoria.primaria">Categoria primaria</label>
                        <input type="text" className="form-control" id="categoria.primaria" {...register('categoria.primaria')} />
                        <p className="text-danger">{errors.categoria?.primaria?.message}</p>
                    </div>
                    <div className="row">
                        <label htmlFor="categoria.secondaria">Categoria secondaria</label>
                        <input type="text" className="form-control" id="categoria.secondaria" {...register('categoria.secondaria')} />
                        <p className="text-danger">{errors.categoria?.secondaria?.message}</p>
                    </div>
                    <div className="row">
                        <label htmlFor="descrizione">Descrizione</label>
                        <input type="text" className="form-control" id="descrizione" {...register('descrizione')} />
                        <p className="text-danger">{errors.descrizione?.message}</p>
                    </div>
                    <div className="row">
                        <label htmlFor="allergeni">Allergeni</label>
                        <input type="text" className="form-control" id="allergeni" {...register('allergeni')} />
                        <p className="text-danger">{errors.allergeni?.message}</p>
                    </div>
                    <div className="row">
                        <label htmlFor="ingredientiModificabili">Ingredienti modificabili</label>
                        <input type="text" className="form-control" id="ingredientiModificabili" {...register('ingredientiModificabili')} />
                        <p className="text-danger">{errors.ingredientiModificabili?.message}</p>
                    </div>
                    <div className="row">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="disponibile" {...register('disponibile')} />
                            <label className="form-check-label" htmlFor="disponibile">Disponibile</label>
                            <p className="text-danger">{errors.disponibile?.message}</p>
                        </div>
                    </div>
                    <button hidden={true} type="submit" id={modalId + "-formSubmitButton-" + index}></button>
                </form>
            </div>
        </Modal>
    )
}