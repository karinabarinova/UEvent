import { useTranslation } from "react-i18next";
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch, shallowEqual } from 'react-redux'
import { createEvent } from "../store/products/productSlice";
// import LocationSearchInput from './LocationSearch'
import LocationSearch from './LocationSearch';
import { useState } from "react";

export default function CreateProduct() {
    const { t } = useTranslation('common');
    const history = useHistory();
    const dispatch = useDispatch();
    const [location, setLocation] = useState([[67, -118]])
    const event = useSelector(({product}) => product.newEvent, shallowEqual);

    
    const { inputs, handleChange, clearForm } = useForm({
        image: '',
        name: 'Python Meetup',
        price: 120,
        description: 'Best',
        // location: [67, -118],
        startDate: '',
        theme: "JS",
        format: "Conference"
    });

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            dispatch(createEvent({
                image: inputs.image,
                name: inputs.name,
                price: inputs.price,
                description: inputs.description,
                location: location,
                startDate: inputs.startDate,
                theme: inputs.theme,
                format: inputs.format
            }))
            clearForm();
            history.push('/event/' + (event.id + 1)) //TODO: add id of the newly created event

        }}>
            <h1>{t("NEW_EVENT")}</h1>
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
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="price">
                    {t("PRICE")}
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder={t("PRICE")}
                        value={inputs.price}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    {t("DESCRIPTION")}
                    <textarea
                        id="description"
                        name="description"
                        placeholder={t("DESCRIPTION")}
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="startDate">
                    {t("START_DATE")}
                    <input
                        required
                        type="datetime-local"
                        id="startDate"
                        name="startDate"
                        placeholder={t("START_DATE")}
                        value={inputs.startDate}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="theme">
                    {t("THEME")}
                    <textarea
                        required
                        id="theme"
                        name="theme"
                        placeholder={t("THEME")}
                        value={inputs.theme}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="format">
                    {t("FORMAT")}
                    <textarea
                        required
                        id="format"
                        name="format"
                        placeholder="Conference, Exchange, Virtual event, Exhibition ..."
                        value={inputs.format}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="location">
                    {t("LOCATION")}
                    <LocationSearch setLocation={setLocation}/>
                </label>
                <button type="submit">+ {t("ADD_EVENT")}</button>
            </fieldset>
        </Form>
    )
};