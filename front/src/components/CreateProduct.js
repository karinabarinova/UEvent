// import gql from 'graphql-tag'
import useForm from '../lib/useForm';
// import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux'

export default function CreateProduct() {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        image: '',
        name: 'Python Meetup',
        price: 120,
        description: 'Best'
    });

    // const [createProduct, { loading, error, data }] = useMutation(
    //     CREATE_PRODUCT_MUTATION,
    //     {
    //         variables: inputs,
    //         refetchQueries: [{ query: ALL_PRODUCTS_QUERY }]
    //     }
    // );


    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            //Submit the input fields to the backend
            // const res = await createProduct();
            clearForm();
            history.push('/event/' + 3) //TODO: add id of the newly created event

        }}>
            {/* <DisplayError error={error} /> */}
            <fieldset>
                <label htmlFor="image">
                    Image
                    <input
                        required
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    Name
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
                    Price
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
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        value={inputs.description}
                    />
                </label>
                <button type="submit">+ Add Event</button>
            </fieldset>
        </Form>
    )
};