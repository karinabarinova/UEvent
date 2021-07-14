import { useTranslation } from "react-i18next";
import useForm from '../lib/useForm';
import Form from './styles/Form';
import {useDispatch } from 'react-redux'
import { createCompany } from "../store/company/companySlice";
import LocationSearch from './LocationSearch';
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function CreateCompany() {
    const history = useHistory();
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const [location, setLocation] = useState([[67, -118]])
    
    const { inputs, handleChange, clearForm } = useForm({
        image: '',
        name: 'Google',
        description: 'Best'
    });

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            dispatch(createCompany({
                image: inputs.image,
                name: inputs.name,
                description: inputs.description,
                location
            }))
            clearForm();
            history.push('/companies')

        }}>
            <h1>{t("NEW_COMPANY")}</h1>
            <fieldset>
                <label htmlFor="image">
                    {t("IMAGE")}
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    {t("NAME")}
                    <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        placeholder={t("NAME")}
                        onChange={handleChange}
                        value={inputs.name}
                    />
                </label>
                <label htmlFor="description">
                    {t("DESCRIPTION")}
                    <textarea
                        required
                        id="description"
                        name="description"
                        placeholder={t("DESCRIPTION")}
                        onChange={handleChange}
                        value={inputs.description}
                    />
                </label>
                 <label htmlFor="location">
                    {t("COMPANY_LOCATION")}
                    <LocationSearch setLocation={setLocation}/>
                </label>
                <button type="submit">+ {t("ADD_COMPANY")}</button>
            </fieldset>
        </Form>
    )
};