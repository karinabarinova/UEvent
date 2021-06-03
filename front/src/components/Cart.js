import { useSelector } from 'react-redux';
import styled from 'styled-components';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import { Checkout } from './Checkout';
import RemoveFromCart from './RemoveFromCart';
import CartStyles from './styles/CartStyles'
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import { useUser } from './User'

const CartItemStyles = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid var(---lightGrey);
    display: grid;
    grid-template-columns: auto 1fr auto;
    img {
        margin-right: 1rem;
    }
    h3,
    p {
        margin: 0;
    }
`

function CartItem({cartItem}) {
    return <CartItemStyles>
        <img 
            width="100" 
            src={cartItem?.image ? cartItem.image : '/defaultEventPage.jfif'} 
            alt={cartItem.name}
        />
        <div>
            <h3>{cartItem.name}</h3>
            <p>${cartItem.price * cartItem.quantity}-<em>{cartItem.quantity} &times; ${cartItem.price} each
            </em>
            </p>
        </div>
        <RemoveFromCart id={cartItem.id}/>
        </CartItemStyles>
}

export default function Cart() {
    const me = useUser();
    const {cart} = useSelector(({cart}) => cart)
    const {cartOpen, closeCart } = useCart();
    if (!me.user.email) return null;
    return <CartStyles open={cartOpen}>
        <header>
            <Supreme>{me.user.firstName}'s Cart</Supreme>
            <CloseButton onClick={closeCart}>&times;</CloseButton>
        </header>
        <ul>
            {cart.map((cartItem, index) => <CartItem key={index} cartItem={cartItem}/>)}
        </ul>
        <footer>
            <p>${calcTotalPrice(cart)}</p>
            <Checkout />
        </footer>
    </CartStyles>
}
