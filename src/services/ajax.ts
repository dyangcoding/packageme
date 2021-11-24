import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_TOTP_BASE_URL,
	timeout: 20000,
	headers: {
		'Content-type': 'application/json',
	}
});

instance.interceptors.response.use(function(response) {
	return response;
}, function(error) {
	if (error.response.status === 401) {
		return Promise.reject(new Error('Can not verify the input code, try again.'));
	} else {
		return Promise.reject(error);
	}
});

const responseHandler = (response: AxiosResponse) => Promise.resolve(response.data);

export const requests = {
	get: (url: string) => instance.get(url).then(responseHandler),
	post: (url: string, body: {}) => instance.post(url, body).then(responseHandler),
	put: (url: string, body: {}) => instance.put(url, body).then(responseHandler),
	delete: (url: string) => instance.delete(url).then(responseHandler),
};