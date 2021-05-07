import {Link} from 'react-router-dom';
import NavStyles from './styles/NavStyles';

export default function Nav() {
    return (
        <NavStyles>
            <Link to='/events'>Events</Link>
            <Link to='/sell'>Sell</Link>
            <Link to='/orders'>Orders</Link>
            <Link to='/account'>Account</Link>
        </NavStyles>
    )
}
