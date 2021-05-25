// import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import product from './products/productSlice'
import company from './company/companySlice'
import auth from './auth/authSlice'
import register from './auth/registerSlice'
import cart from './cart/cartSlice'

const createReducer = asyncReducers => 
    combineReducers({
        auth,
        register,
        product,
        company,
        cart
    })

export default createReducer;
