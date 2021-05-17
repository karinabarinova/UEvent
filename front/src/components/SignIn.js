import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useForm from "../lib/useForm";
import {login} from '../store/auth/authSlice'

import Form from "./styles/Form";
import { useUser } from "./User";

export default function SignIn() {
    const data = useSelector(({auth}) => auth)
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useUser();
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: ''
    })
    console.log("user2", user)
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(login(inputs));
        resetForm();
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Into Your Account</h2>
            <fieldset>
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
                <button type="submit">Sign in!</button>
            </fieldset>
        </Form>
    )
}