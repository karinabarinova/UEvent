import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios';
import jwt from '../auth/index';
import { showMessage } from '../message/messageSlice';

export const createCompany = data => async (dispatch, getState) => {
    return jwt
        .createCompany(data)
        .then((data) => {
            return dispatch(showMessage(data.message))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const getAllCompanies = (page) => async (dispatch, getState) => {
    return axios.get(`/company?page=${page}`)
        .then(({data}) => {
            return dispatch(getAll(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const getCompanyById = id => async (dispatch, getState) => {
    return axios.get(`/company/${id}`)
        .then(({data}) => {
            return dispatch(getById(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const deleteCompany = id => async (dispatch, getState) => {
    return axios.delete(`/company/${id}`)
        .then(({data}) => {
            return dispatch(setDeletedCompany(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const updateCompany = company => async (dispatch, getState) => {
    return axios.patch(`/company/${company.id}`)
        .then(({data}) => {
            return dispatch(setUpdatedCompany(data))
        })
        .catch(error => {
            return dispatch(showMessage(error.message))
        })
}

export const companySlice = createSlice({
    name: "companies",
    initialState: {
        companies: [],
        company: {},
    },
    reducers: {
        getAll: (state, action) => {
            state.companies = action.payload
        },
        getById: (state, action) => {
            state.company = action.payload
        },
        setUpdatedCompany: (state, action) => {
            state.company = action.payload
        },
        setDeletedCompany: (state, action) => {
            state.company.message = action.payload
        }
    },
    extraReducers: {}
})

export const { getAll, getById, setUpdatedCompany, setDeletedCompany } = companySlice.actions

export default companySlice.reducer
