import { useDispatch, useSelector } from "react-redux";
import useForm from "../lib/useForm";
import {requestReset} from '../store/auth/registerSlice'

import Form from "./styles/Form";

export default function RequestReset() {
    const data = useSelector(({register}) => register)
    const dispatch = useDispatch()
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    })
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(requestReset(inputs));
        resetForm();
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Request Password Reset</h2>
            <fieldset>
                {data.requestMessage && (
                    <p>{data.requestMessage}</p>
                )}
                <label htmlFor="email">
                    Your Email Address
                    <input 
                        type="email" 
                        name="email" 
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Request Reset!</button>
            </fieldset>
        </Form>
    )
}