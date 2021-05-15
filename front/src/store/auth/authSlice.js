import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

export const login = (data) => async (dispatch, getState) => {
    return axios.post('/auth/login', data)
        .then(({data}) => {
            return dispatch(setLogIn(data))
        })
        .catch(error => {
            return dispatch(setMessage(error.message))
        })
}


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        message: ''
    },
    reducers: {
        setLogIn: (state, action) => {
            state.user = action.payload.data
            state.message = action.payload.message
        },
        setMessage: (state, action) => {
            state.message = action.payload.message
        }
    },
    extraReducers: {}
})

export const { setLogIn, setMessage } = authSlice.actions

export default authSlice.reducer
