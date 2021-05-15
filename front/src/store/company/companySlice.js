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

export const deleteCompany = id => async (dispatch, getState) => {
    return axios.delete(`/company/${id}`)
        .then(({data}) => {
            return dispatch(setDeletedCompany(data))
        })
        .catch(error => {
            console.log("error", error.message)
        })
}

export const updateCompany = company => async (dispatch, getState) => {
    return axios.patch(`/company/${company.id}`)
        .then(({data}) => {
            return dispatch(setUpdatedCompany(data))
        })
        .catch(error => {
            console.log("error", error.message)
        })
}

export const companySlice = createSlice({
    name: "companies",
    initialState: {
        companies: [],
        company: {},
        message: ''
    },
    reducers: {
        getAll: (state, action) => {
            state.companies = action.payload
        },
        getById: (state, action) => {
            state.company = action.payload
        },
        setUpdatedCompany: (state, action) => {
            state.product = action.payload
        },
        setDeletedCompany: (state, action) => {
            state.product.message = action.payload
        }
    },
    extraReducers: {}
})

export const { getAll, getById, setUpdatedCompany, setDeletedCompany } = companySlice.actions

export default companySlice.reducer
