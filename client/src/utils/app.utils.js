import { toast } from "react-toastify";
import size from "lodash/size";

// internal function used for toast config
const _toastConfigs = () => {
	return {
		position: "bottom-right",
		autoClose: 2500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
		progress: undefined,
		theme: "light",
	};
};

export const showToast = (message, type = "error") => {
	if (!size(message)) return;
	if (type === "error") {
		toast.error(message, _toastConfigs());
	} else {
		toast.success(message, _toastConfigs());
	}
};

export const showApiError = (err) => {
	let message = err.response?.data?.message;
	if (!size(message)) message = err.message;
	if (!size(message)) return;
	showToast(message, "error");
};

export const showApiResponseToast = (resData) => {
	let message = resData.message;
	let status = resData.status;
	showToast(message, status >= 400 ?? "error");
};
