import {Link} from 'react-router-dom';
import NavStyles from './styles/NavStyles';

export default function Nav() {
    return (
        <NavStyles>
            <Link to='/events'>Events</Link>
            <Link to='/new-company'>Create a company</Link>
            <Link to='/new-event'>Create an event</Link>
            <Link to='/orders'>Orders</Link>
            <Link to='/account'>Account</Link>
        </NavStyles>
    )
}
