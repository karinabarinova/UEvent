import { useDispatch } from "react-redux";
import styled from "styled-components"
import {removeFromCartItem} from '../store/cart/cartSlice'

const BigButton = styled.button`
    font-size: 3rem;
    background: none;
    border: 0;
    &:hover {
        color: var(--red);
        cursor: pointer;
    }
`;

export default function RemoveFromCart({id}) {
    const dispatch = useDispatch();

    function removeFromCart() {
        dispatch(removeFromCartItem(id))
    }

    return <BigButton 
        type="button" 
        title="Remove This Item from Cart"
        onClick={removeFromCart}
    >&times;</BigButton>
}