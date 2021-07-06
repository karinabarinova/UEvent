import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios';
import { showMessage } from "../message/messageSlice";

export const searchEvents = (name) => async (dispatch, getState) => {
    return axios.get(`/event/search?name=${name}`)
        .then(({data}) => {
            return dispatch(setResult(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        result: [],
        message: ''
    },
    reducers: {
        setResult: (state, action) => {
            state.result = action.payload
        },
    },
    extraReducers: {}
})

export const { setResult } = searchSlice.actions

export default searchSlice.reducer
