import { useTranslation } from "react-i18next";
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux'

export default function CreateProduct() {
    const { t } = useTranslation('common');
    const history = useHistory();
    const dispatch = useDispatch();
    
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        image: '',
        name: 'Python Meetup',
        price: 120,
        description: 'Best'
    });

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            //Submit the input fields to the backend
            // const res = await createProduct();
            clearForm();
            history.push('/event/' + 3) //TODO: add id of the newly created event

        }}>
            <h1>{t("NEW_EVENT")}</h1>
            {/* <DisplayError error={error} /> */}
            <fieldset>
                <label htmlFor="image">
                    {t("IMAGE")}
                    <input
                        required
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
                <label htmlFor="price">
                    {t("PRICE")}
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder={t("PRICE")}
                        onChange={handleChange}
                        value={inputs.price}
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
                <button type="submit">+ {t("ADD_EVENT")}</button>
            </fieldset>
        </Form>
    )
};