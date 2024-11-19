import { appendApiVersion, ensureHttp } from '@/util/helper/helper';
import axios from 'axios';

const baseURL = `${process.env.API_URL ?? 'https://dashboard.channel.org'}`;
const tempAuthToken = 'ShLWbMQmYtXX1M7_vc3kG6gTx6sAWsk2zpq9lsHLPpE';

const instance = axios.create({
	baseURL,
});

instance.interceptors.request.use(config => {
	if (config.params && 'isDynamicDomain' in config.params) {
		config.baseURL = ensureHttp(config.params?.domain_name);
		config.headers.Authorization = `Bearer ${tempAuthToken}`; //temp
	}
	return config;
});

export default instance;
