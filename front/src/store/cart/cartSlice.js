import { createSlice } from "@reduxjs/toolkit"

export const addItemToCart = product => (dispatch, getState) => {
    return dispatch(addItemToCartState(product))
}

export const removeFromCartItem = id => (dispatch, getState) => {
    return dispatch(removeFromCartState(id))
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
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
                if (index != -1) {
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

        }
    },
    extraReducers: {}
})

export const { addItemToCartState, removeFromCartState } = cartSlice.actions

export default cartSlice.reducer
