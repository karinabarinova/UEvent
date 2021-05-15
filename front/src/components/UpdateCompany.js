import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { getCompanyById, updateCompany } from '../store/company/companySlice';
import Form from './styles/Form';
import useForm from '../lib/useForm';

export default function UpdateCompany(props) {
    const history = useHistory();
    const data = useSelector(({company}) => company.company)
    console.log("data1", data);
    const dispatch = useDispatch();

    const { inputs, handleChange, clearForm, resetForm } = useForm(data);

    useEffect(() => {
        dispatch(getCompanyById(props.match.params.id))
    }, []);

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            dispatch(updateCompany(inputs))
        }}>
            <h1>Update Company</h1>
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
                <button type="submit">Update Company</button>
            </fieldset>
        </Form>
    )
}
