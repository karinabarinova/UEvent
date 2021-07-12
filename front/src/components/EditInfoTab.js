import Button from '@material-ui/core/Button';
import { addPassword, addEmail } from "../store/user/userSlice";
import { useDispatch } from "react-redux";
import useForm from '../lib/useForm';
import { useState } from 'react';

export default function EditInfoTab({user}) {
    const dispatch = useDispatch()
    const { inputs, handleChange } = useForm({
        password: '',
        email: user?.email,
    });
    const [emailStyle, setEmailStyle] = useState(false)
    const [passwordStyle, setPasswordStyle] = useState(false)

    const style = {
        background: 'red', color: 'white', padding: '1rem', margin: '1rem', fontSize: 14
    }

    const style2 = {
        background: 'indianred', color: 'white', padding: '1rem', margin: '1rem', fontSize: 14
    }

    function changeAvatar() {
        alert('ca')
    }

    return (
        <div id="input" style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem',
                padding: '1rem'
            }}
        >
            <fieldset>
                <div>
                    <Button 
                        variant="contained" 
                        onClick={() => setPasswordStyle(!passwordStyle)}  
                        style={style}
                    > Change Password 🔐
                    </Button>
                    {passwordStyle && (
                        <>
                            <input 
                                variant="contained" 
                                style={{...style2 }} 
                                id="password" 
                                name="password"
                                type="password" 
                                placeholder="NEW PASSWORD" 
                                onChange={handleChange}
                            />
                            <button 
                                variant="contained" 
                                onClick={() => dispatch(addPassword( inputs.password))} 
                                style={{...style2}}
                                >ADD
                            </button>
                        </>
                    )}
                <div>
                    <Button 
                        variant="contained" 
                        onClick={() => setEmailStyle(!emailStyle)}  
                        style={style}
                    >Change Email 📧
                    </Button>
                    {emailStyle && (
                        <>
                            <input 
                                variant="contained" 
                                style={{...style2}} 
                                name="email"
                                id="email" 
                                type="email" 
                                placeholder="NEW EMAIL" 
                                onChange={handleChange}
                            />
                            <button 
                                variant="contained" 
                                variant="contained" 
                                onClick={() => dispatch(addEmail( inputs.email ))} 
                                style={{...style2}}
                            >ADD</button>
                        </>
                    )}
                    
                </div>
                    <div>
                        <Button variant="contained" onClick={changeAvatar}  style={style}>New Avatar 🤳</Button>
                    </div>
                </div>
            </fieldset>
        </div>        
        )
} 

