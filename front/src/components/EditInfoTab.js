import Button from '@material-ui/core/Button';

import { addPassword, addEmail } from "../store/user/userSlice";
import { useDispatch } from "react-redux";



export default function EditInfoTab({user}) {
        const dispatch = useDispatch()

        const style = {
            background: 'red', color: 'white', padding: '1rem', margin: '1rem', fontSize: 14
        }
        const style2 = {
            background: 'indianred', color: 'white', padding: '1rem', margin: '1rem', fontSize: 14
        }
        function changePassword() {
    document.getElementsByClassName('passwordItems' )[0].style.display = 'initial';
    document.getElementsByClassName('passwordItems' )[1].style.display = 'initial';
}
    function changeEmail() {
        document.getElementsByClassName('emailItems' )[0].style.display = 'initial';
        document.getElementsByClassName('emailItems' )[1].style.display = 'initial';
    }

    function submitEmailChange() {
        let email = document.getElementById('email').value

        if (email) {
            dispatch(addEmail({email: email}));
        }
    }

function changeAvatar() {
    alert('ca')
}

function submitPasswordChange() {
    let password = document.getElementById('password').value

    if (password) {
       dispatch(addPassword({password: password}));
    }

}

    return (
        <div id="input" style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem',
                padding: '1rem'
            }}
        >
            <div >
                <div>
                    <Button variant="contained" onClick={changePassword}  style={style}> Change Password 🔐</Button>
                    <input variant="contained" style={{...style2, display: "none"}} id={"password"} className={"passwordItems"}
                            type="password" placeholder="NEW PASSWORD" />
                    <button variant="contained" className={"passwordItems"} variant="contained" onClick={submitPasswordChange} style={{...style2, display: "none"}}>ADD</button>
                <div>
                    <Button variant="contained" onClick={changeEmail}  style={style}>Change Email 📧</Button>
                    <input variant="contained" style={{...style2, display: "none"}} id={"email"} className={"emailItems"}
                           type="email" placeholder="NEW EMAIL" />
                    <button variant="contained" className={"emailItems"} variant="contained" onClick={submitEmailChange} style={{...style2, display: "none"}}>ADD</button>
                </div>
                    <div>
                        <Button variant="contained" onClick={changeAvatar}  style={style}>New Avatar 🤳</Button>

                    </div>
                </div>




            </div>


        </div>        
        )
} 

