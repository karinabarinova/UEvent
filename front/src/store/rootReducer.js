// import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import product from './products/productSlice'
import company from './company/companySlice'
import auth from './auth/authSlice'

const createReducer = asyncReducers => 
    combineReducers({
        auth,
        product,
        company
    })

export default createReducer;
