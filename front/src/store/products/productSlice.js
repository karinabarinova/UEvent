import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

export const getAllProducts = query => async (dispatch, getState) => {
    return axios.get('/event')
        .then(({data}) => {
            return dispatch(getAll(data))
        })
        .catch(error => {
            console.log("error", error.message)
        })
}

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: []
    },
    reducers: {
        getAll: (state, action) => {
            state.products = action.payload
        }
    },
    extraReducers: {}
})

export const { getAll } = productSlice.actions

export default productSlice.reducer
