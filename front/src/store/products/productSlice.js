import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

export const getAllProducts = () => async (dispatch, getState) => {
    return axios.get('/event')
        .then(({data}) => {
            return dispatch(getAll(data))
        })
        .catch(error => {
            console.log("error", error.message)
        })
}

export const getProductById = id => async (dispatch, getState) => {
    return axios.get(`/event/${id}`)
        .then(({data}) => {
            return dispatch(getById(data))
        })
        .catch(error => {
            console.log("error", error.message)
        })
}

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        product: {}
    },
    reducers: {
        getAll: (state, action) => {
            state.products = action.payload
        },
        getById: (state, action) => {
            state.product = action.payload
        }
    },
    extraReducers: {}
})

export const { getAll, getById } = productSlice.actions

export default productSlice.reducer
