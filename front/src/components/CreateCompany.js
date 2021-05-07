import useForm from '../lib/useForm';
import Form from './styles/Form';
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux'

export default function CreateCompany() {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        image: '',
        name: 'Google',
        description: 'Best'
    });

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            //Submit the input fields to the backend
            // const res = await createProduct();
            clearForm();
            history.push('/company/' + 3) //TODO: add id of the newly created event

        }}>
            <h1>New Company</h1>
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
                <button type="submit">+ Add Company</button>
            </fieldset>
        </Form>
    )
};