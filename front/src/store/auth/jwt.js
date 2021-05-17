import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Emitter from './eventEmmiter'

class JwtService extends Emitter {
    init() {
        this.setInterceptors();
		this.handleAuthentication();
    }

    setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};

	setSession = (access_token, refresh_token) => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			localStorage.setItem('jwt_refresh_token', refresh_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			localStorage.removeItem('jwt_refresh_token');

			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	login = data => {
		return new Promise((resolve, reject) => {
			axios
				.post('/auth/login', data)
				.then(response => {
					console.log('response', response)
					if (response.data.data.accessToken) {
						this.setSession(response.data.data.accessToken);
						resolve(response.data);
					}
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	};

	removeEvent = id => {
		return axios.delete(`/event/${id}`);
	};
}

const instance = new JwtService();

export default instance;
