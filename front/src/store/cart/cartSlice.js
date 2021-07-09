import { createSlice } from "@reduxjs/toolkit"
import jwt from '../auth/index';
import { showMessage } from '../message/messageSlice'

export const checkout = (data) => (dispatch, getState) => {
    return jwt
        .checkout(data)
        .then((data) => {
            return dispatch(showMessage(data.message))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const addItemToCart = product => (dispatch, getState) => {
    return dispatch(addItemToCartState(product))
}

export const removeFromCartItem = id => (dispatch, getState) => {
    return dispatch(removeFromCartState(id))
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        error: '',
        message: ''
    },
    reducers: {
        addItemToCartState: (state, action) => {
            if (Object.keys(state.cart).length === 0) {
                const product = action.payload
                product.quantity = 1;
                state.cart.push(product)
            }
            else {
                const copy = state.cart.slice();
                const index = copy.findIndex((item) => item.id === action.payload.id)
                if (index !== -1) {
                    copy[index].quantity++
                } else {
                    const product = action.payload
                    product.quantity = 1
                    copy.push(product);
                }
                state.cart = copy;
            }
        },
        removeFromCartState: (state, action) => {
            const copy = state.cart.slice();
            const index = copy.findIndex((item) => item.id === action.payload)
            if (index !== -1)
                copy.splice(index, 1);
            state.cart = copy;

        },
        clearCart: (state, action) => {
            state.cart = []
        }
    },
    extraReducers: {}
})

export const { addItemToCartState, removeFromCartState, clearCart } = cartSlice.actions

export default cartSlice.reducer
