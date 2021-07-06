import { createSlice } from "@reduxjs/toolkit";
import jwt from './index';

export const login = (data) => async (dispatch, getState) => {
    return jwt
        .login(data)
        .then(data => {
            return dispatch(setLogIn(data))
        })
        .catch(error => {
            return dispatch(setMessage("Error"))
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
    cart: {},
    message: ''
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
        setLogout: (state, action) => initialState,
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: {}
})

export const { setLogIn, setMessage, setLogout } = authSlice.actions

export default authSlice.reducer
