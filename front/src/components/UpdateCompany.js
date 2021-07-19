import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import { getCompanyById, updateCompany } from '../store/company/companySlice';
import { useTranslation } from "react-i18next";
import LocationSearch from './LocationSearch';
import Form from './styles/Form';
import useForm from '../lib/useForm';

export default function UpdateCompany(props) {
    const { t } = useTranslation('common');
    const company = useSelector(({company}) => company.company)
    const dispatch = useDispatch();
    const [location, setLocation] = useState([[]])
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        name: company?.name,
        description: company?.description
    });

    useEffect(() => {
        dispatch(getCompanyById(props.match.params.id))
    }, []);

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            dispatch(updateCompany({
                name: inputs.name,
                description: inputs.description,
                location
            }, company?.id))
            clearForm()
        }}>
            <h1>{t("UPDATE_COMPANY")}</h1>
            <fieldset>
                {/* <label htmlFor="image"> //TODO: will I change the image?
                    Image
                    <input
                        required
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </label> */}
                <label htmlFor="name">
                    {t("NAME")}
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={inputs.name}
                    />
                </label>
                <label htmlFor="description">
                    {t("DESCRIPTION")}
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        value={inputs.description}
                    />
                </label>
                <label htmlFor="location">
                    {t("COMPANY_LOCATION")}
                    <LocationSearch setLocation={setLocation}/>
                </label>
                <button type="submit">{t("UPDATE_COMPANY")}</button>
            </fieldset>
        </Form>
    )
}
