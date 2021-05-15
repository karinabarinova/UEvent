// import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import product from './products/productSlice'
import company from './company/companySlice'

const createReducer = asyncReducers => 
    combineReducers({
        product,
        company
    })

export default createReducer;
