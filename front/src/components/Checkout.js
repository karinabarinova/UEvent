import styled from "styled-components"
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import AwesomeButton from './styles/AwesomeButton'
import { useState } from "react";
import nProgress from "nprogress";
import './styles/nprogress.css';
import { useUser } from './User'
import { useDispatch, useSelector } from "react-redux";
import { checkout, clearCart } from '../store/cart/cartSlice'
import { useCart } from "../lib/cartState";

const CheckoutFormStyles = styled.form`
    box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    padding: 1rem;
    display: grid;
    grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function CheckoutForm() {
    const { closeCart } = useCart();
    const dispatch = useDispatch();
    const {cart} = useSelector(({cart}) => cart)
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const userData = useUser();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        //start the page transition
        nProgress.start();
        //create the payment method via stripe (token comes back here if successfull)
        const { error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });
        //handler errors from stripe
        if (error) {
            setError(error);
            nProgress.done();
            return;
        }
        //send the token to server (pass userId)
        dispatch(checkout({userId: userData.user.id, token: paymentMethod.id, items: cart}))
        //change the page to view the order
        //close the cart

        //turn the loader off
        setLoading(false);
        nProgress.done();
        dispatch(clearCart())
        closeCart();
    }

    return (
        <CheckoutFormStyles onSubmit={handleSubmit}>
            {error && <p style={{fontSize: 12}}>{error.message}</p>}
            <CardElement />
            <AwesomeButton>Check Out Now</AwesomeButton>
        </CheckoutFormStyles>
    )
}

function Checkout() {
    return (
        <Elements stripe={stripeLib}>
            <CheckoutForm />
        </Elements>
    )
}

export { Checkout };
