import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

export const getAllCompanies = () => async (dispatch, getState) => {
    return axios.get('/company')
        .then(({data}) => {
            return dispatch(getAll(data))
        })
        .catch(error => {
            console.log("error", error.message)
        })
}

export const getCompanyById = id => async (dispatch, getState) => {
    return axios.get(`/company/${id}`)
        .then(({data}) => {
            return dispatch(getById(data))
        })
        .catch(error => {
            console.log("error", error.message)
        })
}

export const companySlice = createSlice({
    name: "companies",
    initialState: {
        companies: [],
        company: {}
    },
    reducers: {
        getAll: (state, action) => {
            state.companies = action.payload
        },
        getById: (state, action) => {
            state.company = action.payload
        }
    },
    extraReducers: {}
})

export const { getAll, getById } = companySlice.actions

export default companySlice.reducer
