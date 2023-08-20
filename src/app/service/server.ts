import axios from 'axios';
import { cookies } from 'next/headers';

const server = axios.create({
	baseURL: 'https://d50e-114-205-30-236.ngrok-free.app/',
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
		'ngrok-skip-browser-warning': '69420',
	},
});

server.interceptors.request.use(async (config) => {
	const token = cookies().get('accessToken')?.value;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
export default server;
