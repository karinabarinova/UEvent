import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useForm from "../lib/useForm";
import {login} from '../store/auth/authSlice'

import Form from "./styles/Form";
import { useUser } from "./User";

export default function SignIn() {
    const { t } = useTranslation('common');
    const data = useSelector(({auth}) => auth)
    const history = useHistory();
    const dispatch = useDispatch()
    const userData = useUser();
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: ''
    })
    console.log("user2", userData)
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(login(inputs));
        resetForm();
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>{t("SIGNINTO")}</h2>
            <fieldset>
                <label htmlFor="email">
                    {t("EMAIL")}
                    <input 
                        type="email" 
                        name="email" 
                        placeholder={t("YOUR_EMAIL")} 
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    {t("PASSWORD")}
                    <input 
                        type="password" 
                        name="password" 
                        placeholder={t("YOUR_PASSWORD")} 
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">{t("SIGNIN!")}</button>
            </fieldset>
        </Form>
    )
}