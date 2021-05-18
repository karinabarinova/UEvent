import {Link} from 'react-router-dom';
import { useCart } from '../lib/cartState';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
    const userData = useUser();
    const {openCart} = useCart()
    console.log("user", userData)
    return (
        <NavStyles>
            <Link to='/1'>Events</Link>
            <Link to='/companies/1'>Companies</Link>
            { userData?.user?.id && (
                <>
                    <Link to='/new-company'>New company</Link>
                    <Link to='/new-event'>New event</Link>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/account'>Account</Link>
                    <SignOut />
                    <button type="button" onClick={openCart}>My Cart</button>
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
