import Button from '@material-ui/core/Button';
import {setUserPassword} from "../store/user/userSlice";
const style = {
    background: 'red', color: 'white', padding: '1rem', margin: '1rem', fontSize: 14
}
function changePassword() {
    alert('cp')
    setUserPassword()
}

function changeEmail() {
    alert('ce')
}

function changeAvatar() {
    alert('ca')
}

function EditInfoTab({user}) {


    return (
        <div style={{
                display: 'flex', 
                justifyContent: 'center', 
                margin: '1rem', 
                padding: '1rem'
            }}
        >
            <Button variant="contained" onClick={changePassword} style={style}>Change Password 🔐</Button>
            <Button variant="contained" onClick={changeEmail} style={style}>Change Email 📧</Button>
            <Button variant="contained" onClick={changeAvatar} style={style}>New Avatar 🤳</Button>
        </div>        
        )
} 

export default EditInfoTab;
