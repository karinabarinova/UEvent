import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

// export const getAllCompanies = () => async (dispatch, getState) => {
//     return axios.get('/company')
//         .then(({data}) => {
//             return dispatch(getAll(data))
//         })
//         .catch(error => {
//             console.log("error", error.message)
//         })
// }


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        message: ''
    },
    reducers: {
        setLogIn: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: {}
})

export const { setLogIn } = authSlice.actions

export default authSlice.reducer
