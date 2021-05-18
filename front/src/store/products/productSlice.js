import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios';
import jwt from '../auth/index';

export const getAllProducts = (page) => async (dispatch, getState) => {
    return axios.get(`/event?page=${page}`)
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
    console.log(jwt)
    return jwt
        .removeEvent(id)
        .then(({data}) => {
            return dispatch(setDeletedEvent(data))
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

export const { getAll, getById, setUpdatedEvent, setDeletedEvent } = productSlice.actions

export default productSlice.reducer
