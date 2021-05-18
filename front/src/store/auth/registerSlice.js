import { createSlice } from '@reduxjs/toolkit';
import jwt from './jwt';

export const register = (data) => async dispatch => {
	return jwt
		.register(data)
		.then((data) => {
			return dispatch(registerSuccess(data));
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const verifyToken = (data) => async dispatch => {
	return jwt
		.verifyToken(data)
		.then((data) => {
			return dispatch(verifySuccess(data));
		})
		.catch(error => {
			return dispatch(verifyError(error));
		});
};

export const requestReset = (data) => async dispatch => {
	return jwt
		.requestReset(data)
		.then((data) => {
			return dispatch(requestSuccess(data));
		})
		.catch(error => {
			return dispatch(requestError(error));
		});
};

const initialState = {
	success: false,
	message: '',
	verificationMessage: '',
	verificationError: '',
	requestMessage: '',
	requestError: ''
};

const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		resetState: (state, action) => {
			state.success = initialState.success;
			state.message = initialState.message;
		},
		registerSuccess: (state, action) => {
			state.success = true;
            state.message = action.payload.message;
		},
		registerError: (state, action) => {
			state.success = false;
			state.message = action.payload.message;
		},
		verifySuccess: (state, action) => {
			state.success = false;
			state.verificationMessage = action.payload.message;
		},
		verifyError: (state, action) => {
			state.success = false;
			state.verificationError = action.payload.message;
		},
		requestSuccess: (state, action) => {
			state.success = false;
			state.requestMessage = action.payload.message;
		},
		requestError: (state, action) => {
			state.success = false;
			state.requestError = action.payload.message;
		},
	},
	extraReducers: {}
});

export const { registerSuccess, registerError, resetState, 
	verifySuccess, verifyError, 
	requestSuccess, requestError 
} = registerSlice.actions;

export default registerSlice.reducer;
