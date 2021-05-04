// import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import product from './products/productSlice'

const createReducer = asyncReducers => 
    combineReducers({
        product
    })

export default createReducer;
