import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Nav() {
    const { t } = useTranslation('common');
    const userData = useUser();
    const {cart} = useSelector(({cart}) => cart)
    const {openCart} = useCart()
    console.log("user", userData)
    return (
        <NavStyles>
            <Link to='/1'>{t("EVENTS")}</Link>
            <Link to='/companies/1'>{t("COMPANIES")}</Link>
            { userData?.user?.id && (
                <>
                    <Link to='/new-company'>{t("NEW_COMPANY")}</Link>
                    <Link to='/new-event'>{t("NEW_EVENT")}</Link>
                    <Link to='/orders'>{t("ORDERS")}</Link>
                    <Link to='/account'>{t("ACCOUNT")}</Link>
                    <SignOut />
                    <button type="button" onClick={openCart}>
                        <ShoppingCartIcon style={{fontSize: 32, color: "red"}}/>
                        { cart.length > 0 && <CartCount count={cart.reduce((tally, item) => tally + item.quantity, 0)}/> }
                    </button>
                </>
            )}
            { !userData.user.id && (
                <>
                    <Link to='/signin'>{t('SIGNIN')}</Link>
                </>
            )}
            <LanguageSwitcher />
        </NavStyles>
    )
}
