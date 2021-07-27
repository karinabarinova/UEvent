import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios';
import jwt from '../auth/index';
import { showMessage } from '../message/messageSlice';

export const addComment = data => async (dispatch, getState) => {
    return jwt
        .addComment(data)
        .then(({data}) => {
            return dispatch(getById(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}


export const createEvent = data => async (dispatch, getState) => {
    return jwt
        .createEvent(data)
        .then(({data}) => {
            dispatch(newEvent(data))
            return dispatch(getAllProducts(1))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const getAllProducts = (page) => async (dispatch, getState) => {
    return axios.get(`/event?page=${page}`)
        .then(({data}) => {
            return dispatch(getAll(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const getProductById = id => async (dispatch, getState) => {
    return axios.get(`/event/${id}`)
        .then(({data}) => {
            return dispatch(getById(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const deleteEvent = id => async (dispatch, getState) => {
    return jwt
        .removeEvent(id)
        .then(({data}) => {
            dispatch(showMessage(data.message))
            dispatch(getAllProducts(1))
            return dispatch(setDeletedEvent(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const updateEventImage = (image, id) => async (dispatch, getState) => {
    return jwt
        .updateEventImage(image, id)
        .then((data) => {
            dispatch(showMessage(data.message))
            return dispatch(getProductById(id))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const updateEvent = (event, id) => async (dispatch, getState) => {
    return axios.patch(`/event/${id}`, event)
        .then(({data}) => {
            dispatch(showMessage(data.message))
            return dispatch(setUpdatedEvent(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        product: {},
        message: '',
        newEvent: {}
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
        },
        newEvent: (state, action) => {
            state.newEvent = action.payload
        },
        clearNewEvent: (state, action) => {
            state.newEvent = {}
        }

    },
    extraReducers: {}
})

export const { getAll, getById, setUpdatedEvent, setDeletedEvent, newEvent, clearNewEvent } = productSlice.actions

export default productSlice.reducer
