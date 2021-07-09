import { createSlice } from "@reduxjs/toolkit";
import jwt from './index';
import { showMessage } from '../message/messageSlice'

export const login = (data) => async (dispatch, getState) => {
    return jwt
        .login(data)
        .then(data => {
            dispatch(showMessage(data.message))
            return dispatch(setLogIn(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const logout = () => async (dispatch, getState) => {
    const {user} = getState().auth;
    if (!user.role || !user.role.length)
        return null;

    jwt.logout();
    dispatch(setLogout());
}

const initialState = {
    user: {},
    cart: {}
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogIn: (state, action) => {
            state.user = action.payload.data
            state.message = action.payload.message
            localStorage.setItem('user', JSON.stringify(state))
        },
        setLogout: (state, action) => initialState
    },
    extraReducers: {}
})

export const { setLogIn, setLogout } = authSlice.actions

export default authSlice.reducer
