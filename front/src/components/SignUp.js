import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useForm from "../lib/useForm";
import {register} from '../store/auth/registerSlice'

import Form from "./styles/Form";

export default function SignIn() {
    const data = useSelector(({register}) => register)
    const dispatch = useDispatch()
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        firstName: '', //TODO: change this to just name field on server
        lastName: ''
    })
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(register(inputs));
        resetForm();
    }
    
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Up for An Account</h2>
            <fieldset>
                {data.message && (
                    <p>{data.message}</p>
                )}
                <label htmlFor="firstName">
                    Your First Name
                    <input 
                        type="text" 
                        name="firstName" 
                        placeholder="John" 
                        autoComplete="given-name"
                        value={inputs.firstName}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="lastName">
                    Your Last Name
                    <input 
                        type="text" 
                        name="lastName" 
                        placeholder="Doe" 
                        autoComplete="family-name"
                        value={inputs.lastName}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Your email address" 
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign up!</button>
            </fieldset>
        </Form>
    )
}