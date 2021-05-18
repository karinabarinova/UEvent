import {Link} from 'react-router-dom';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
    const userData = useUser();
    console.log("user", userData)
    return (
        <NavStyles>
            <Link to='/1'>Events</Link>
            <Link to='/companies/1'>Companies</Link>
            { userData?.user?.id && (
                <>
                    <Link to='/new-company'>Create a company</Link>
                    <Link to='/new-event'>Create an event</Link>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/account'>Account</Link>
                    <SignOut />
                </>
            )}
            { !userData.user.id && (
                <>
                    <Link to='/signin'>Sign In</Link>
                </>
            )}
           
        </NavStyles>
    )
}
