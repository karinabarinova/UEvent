import {Link} from 'react-router-dom';
import NavStyles from './styles/NavStyles';

export default function Nav() {
    return (
        <NavStyles>
            <Link href='/products'>Products</Link>
            <Link href='/sell'>Sell</Link>
            <Link href='/orders'>Orders</Link>
            <Link href='/account'>Account</Link>
        </NavStyles>
    )
}
