import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { getProductById, updateEvent } from '../store/products/productSlice';
import Form from './styles/Form';
import useForm from '../lib/useForm';

export default function UpdateEvent(props) {
    const history = useHistory();
    const data = useSelector(({product}) => product.product)
    const dispatch = useDispatch();

    const { inputs, handleChange, clearForm, resetForm } = useForm(data?.event);
    // console.log(inputs)

    useEffect(() => {
        dispatch(getProductById(props.match.params.id))
    }, []);

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            console.log("inputs", inputs)
            dispatch(updateEvent(inputs))
            //Submit the input fields to the backend
            // const res = await createProduct();
            // clearForm();
            // history.push('/event/' + 3) //TODO: add id of the newly created event

        }}>
            <h1>Update Event</h1>
            {/* <DisplayError error={error} /> */}
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
                <button type="submit">Update Event</button>
            </fieldset>
        </Form>
    )
}
