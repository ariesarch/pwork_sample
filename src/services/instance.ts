import axios from 'axios';

const baseURL = `${
	process.env.API_URL ?? 'https://jsonplaceholder.typicode.com'
}/`;

const instance = axios.create({
	baseURL,
});

instance.interceptors.request.use(config => {
	return config;
});

export default instance;
