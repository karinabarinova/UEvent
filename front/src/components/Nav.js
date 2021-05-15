import {Link} from 'react-router-dom';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
    const user = useUser();
    console.log("user", user)
    return (
        <NavStyles>
            <Link to='/events/1'>Events</Link>
            <Link to='/companies/1'>Companies</Link>
            { user?.id && (
                <>
                    <Link to='/new-company'>Create a company</Link>
                    <Link to='/new-event'>Create an event</Link>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/account'>Account</Link>
                </>
            )}
            { !user.id && (
                <>
                    <Link to='/signin'>Sign In</Link>
                    <Link to='/signup'>Sign Up</Link>
                </>
            )}
           
        </NavStyles>
    )
}
