import Button from '@material-ui/core/Button';

const style = {
    background: 'red', color: 'white', padding: '1rem', margin: '1rem', fontSize: 14
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
            <Button variant="contained" style={style}>Change Password 🔐</Button>
            <Button variant="contained" style={style}>Change Email 📧</Button>
            <Button variant="contained" style={style}>New Avatar 🤳</Button>
        </div>        
        )
} 

export default EditInfoTab;
