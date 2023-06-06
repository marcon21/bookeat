import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function FormFieldsManager({onFormFieldChange, formFieldsEmpty, indexToLoad }) {
    const loaderData = useLoaderData();

    const fillFields = () => {
        if (indexToLoad === null) {
            return formFieldsEmpty;
        }
        return loaderData[indexToLoad];
    }

    useEffect(() => {
        onFormFieldChange(fillFields());
    }, [indexToLoad]);
}