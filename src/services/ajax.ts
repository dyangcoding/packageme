import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8080/',
	timeout: 15000,
	headers: {
		'Content-type': 'application/json',
	}
});

const responseBody = (response: AxiosResponse) => Promise.resolve(response.data);

export const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};