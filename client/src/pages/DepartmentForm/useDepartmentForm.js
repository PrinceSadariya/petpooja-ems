import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Api from "../../utils/api.utils";
import urls from "../../utils/urls.utils";
import { showApiError, showApiResponseToast } from "../../utils/app.utils";

export default function useDepartmentForm({ id }) {
	const [department, setDepartment] = useState({
		name: "",
		status: true,
	});

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({ values: department });

	useEffect(() => {
		const fetchDepartmentById = async () => {
			try {
				const { data: resData } = await Api.post({
					url: urls.departmentGetById(id),
				});
				setDepartment(resData.data);
			} catch (error) {
				showApiError(error);
			}
		};

		id && fetchDepartmentById();
	}, [id]);

	const handleDepartmentSubmit = handleSubmit(async (data) => {
		let reqBody = {
			id: data.id,
			name: data.name,
			status: data.status ? 1 : 0,
		};
		if (!data.id) {
			delete reqBody.id;
		}
		try {
			const { data: resData } = await Api.post({
				url: data.id ? urls.departmentUpdate() : urls.departmentAdd(),
				data: reqBody,
			});
			showApiResponseToast(resData);
			navigate("/department");
		} catch (error) {
			showApiError(error);
		}
	});

	return {
		register,
		handleDepartmentSubmit,
		errors,
		isSubmitting,
	};
}
