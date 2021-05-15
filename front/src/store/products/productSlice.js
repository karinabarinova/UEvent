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

export const deleteEvent = id => async (dispatch, getState) => {
    return axios.delete(`/event/${id}`)
        .then(({data}) => {
            return dispatch(getById(data))
        })
        .catch(error => {
            console.log("error", error.message)
        })
}

export const updateEvent = event => async (dispatch, getState) => {
    return axios.patch(`/event/${event.id}`)
        .then(({data}) => {
            return dispatch(setUpdatedEvent(data))
        })
        .catch(error => {
            console.log("error", error.message)
        })
}

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        product: {},
        message: ''
    },
    reducers: {
        getAll: (state, action) => {
            state.products = action.payload
        },
        getById: (state, action) => {
            state.product = action.payload
        },
        setUpdatedEvent: (state, action) => {
            state.product = action.payload
        },
        setDeletedEvent: (state, action) => {
            state.product.message = action.payload
        }
    },
    extraReducers: {}
})

export const { getAll, getById, setUpdatedEvent } = productSlice.actions

export default productSlice.reducer
