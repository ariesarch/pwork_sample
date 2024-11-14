import { appendApiVersion, ensureHttp } from '@/util/helper/helper';
import axios from 'axios';

const baseURL = `${process.env.API_URL ?? 'https://dashboard.channel.org'}`;

const instance = axios.create({
	baseURL,
});

instance.interceptors.request.use(config => {
	if (config.params && 'isDynamicDomain' in config.params) {
		config.baseURL = ensureHttp(config.params?.domain_name);
	}
	return config;
});

export default instance;
