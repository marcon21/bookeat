import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    notes: yup.string(),
    ingredients: yup.array().of(yup.string())
});

export default function PlateSpecs({ plate, onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ingredients: plate.ingredientiModificabili.map((ingrediente) => ingrediente),
        },
    });

    return (
        <div className="modal-body">
            <form id={plate._id.concat("-form")} onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <img src={plate.img} className="img-fluid" alt={plate.nome} />
                    </div>
                    <div className="col-md-6">
                        <h4 className="modal-title">{plate.nome}</h4>
                        <p><strong>Prezzo:</strong> {plate.prezzo}</p>
                        <p><strong>Descrizione:</strong> {plate.descrizione}</p>
                        <p><strong>Allergeni:</strong> {plate.allergeni.join(', ')}</p>
                        <p><strong>Ingredienti modificabili:</strong></p>
                        {plate.ingredientiModificabili.map((ingrediente, index) => (
                            <div className="form-check" key={index}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`${ingrediente}Checkbox`}
                                    {...register('ingredients')}
                                    value={ingrediente}
                                />
                                <label className="form-check-label" htmlFor={`${ingrediente}Checkbox`}>
                                    {ingrediente}
                                </label>
                            </div>
                        ))}
                        <div className="form-group mt-3">
                            <label htmlFor="notes">Note aggiuntive:</label>
                            <input
                                type="text"
                                className={`form-control ${errors.notes ? 'is-invalid' : ''}`}
                                id="notes"
                                {...register('notes')}
                            />
                            {errors.notes && (
                                <div className="invalid-feedback">{errors.notes.message}</div>
                            )}
                        </div>
                    </div>
                </div>
                <button hidden={true} type="submit" id={plate._id.concat("-formSubmitButton")}></button>
            </form>
        </div>
    );
}