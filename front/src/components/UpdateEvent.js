import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import { getProductById, updateEvent } from '../store/products/productSlice';
import { useTranslation } from "react-i18next";
import LocationSearch from './LocationSearch';
import Form from './styles/Form';
import useForm from '../lib/useForm';

export default function UpdateEvent(props) {
    const { t } = useTranslation('common');
    const data = useSelector(({product}) => product.product)
    const [location, setLocation] = useState('')
    const dispatch = useDispatch();

    const { inputs, handleChange, clearForm, resetForm } = useForm({
        price: data?.event?.price,
        description: data?.event?.description,
        name: data?.event?.name
    });

    useEffect(() => {
        dispatch(getProductById(props.match.params.id))
    }, []);
    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            dispatch(updateEvent({
                price: inputs.price,
                name: inputs.name,
                description: inputs.description,
                location
            }, data?.event?.id))
            clearForm();

        }}>
            <h1>{t("UPDATE_EVENT")}</h1>
            <fieldset>
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
                <label htmlFor="price">
                    {t("PRICE")}
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        value={inputs.price}
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
                    {t("LOCATION")}
                    <LocationSearch setLocation={setLocation}/>
                </label>
                <button type="submit">{t("UPDATE_EVENT")}</button>
            </fieldset>
        </Form>
    )
}
