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

const initialState = {
	success: false,
	message: ''
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
		}
	},
	extraReducers: {}
});

export const { registerSuccess, registerError, resetState } = registerSlice.actions;

export default registerSlice.reducer;
