import Axios from "axios";

const axiosInstance = Axios.create({
	timeout: 900000,
});

axiosInstance.interceptors.response.use(
	function (res) {
		return res;
	},
	function (err) {
		return Promise.reject(err);
	}
);

export default class Api {
	/**
	 * GET METHOD
	 * @param {AxiosRequestConfig} config
	 */
	static get(config) {
		const { url, ...restConfig } = config;
		return axiosInstance.get(url, restConfig);
	}

	/**
	 * POST METHOD
	 * @param {AxiosRequestConfig} config
	 */
	static post(config) {
		const { url, data, ...restConfig } = config;
		return axiosInstance.post(url, data, restConfig);
	}

	/**
	 * DELETE METHOD
	 * @param {AxiosRequestConfig} config
	 */
	static delete(config) {
		const { url, data, ...restConfig } = config;
		return axiosInstance.delete(url, data, restConfig);
	}
}
