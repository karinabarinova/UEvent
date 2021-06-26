import { useTranslation } from "react-i18next";
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux'
import { createCompany } from "../store/company/companySlice";

export default function CreateCompany() {
    const { t } = useTranslation('common');
    const history = useHistory();
    const dispatch = useDispatch();
    
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        image: '',
        name: 'Google',
        description: 'Best',
        location: [67, -118]
    });

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            dispatch(createCompany({
                image: inputs.image,
                name: inputs.name,
                description: inputs.description,
                location: inputs.location,
            }))
            clearForm();
            // history.push('/company/' + 3) //TODO: add id of the newly created event

        }}>
            <h1>{t("NEW_COMPANY")}</h1>
            {/* <DisplayError error={error} /> */}
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
                        id="description"
                        name="description"
                        placeholder={t("DESCRIPTION")}
                        onChange={handleChange}
                        value={inputs.description}
                    />
                </label>
                <label htmlFor="location">
                    {t("COMPANY_LOCATION")}
                    <textarea
                        required
                        id="location"
                        name="location"
                        placeholder={t("COMPANY_LOCATION")}
                        value={inputs.location}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">+ {t("ADD_COMPANY")}</button>
            </fieldset>
        </Form>
    )
};