import { appendApiVersion } from '@/util/helper/helper';
import axios from 'axios';

const baseURL = `${process.env.API_URL ?? 'https://patchwork.online'}`;

const instance = axios.create({
	baseURL,
});

instance.interceptors.request.use(config => {
	if (config.params && 'isDynamicDomain' in config.params) {
		config.baseURL = config.params?.slug;
	}
	return config;
});

export default instance;
