import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Api from "../../utils/api.utils";
import urls from "../../utils/urls.utils";
import { showApiError, showApiResponseToast } from "../../utils/app.utils";

export default function useEmployeeForm({ id }) {
	const [employee, setEmployee] = useState({
		id: "",
		name: "",
		departmentId: "",
		dob: "",
		phone: "",
		email: "",
		salary: "",
		status: true,
		newPhoto: "",
		oldPhoto: "",
	});
	const [departmentOption, setDepartmentOption] = useState([]);

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
	} = useForm({ values: employee });

	useEffect(() => {
		const fetchEmployeeById = async () => {
			try {
				const { data: resData } = await Api.post({
					url: urls.employeeGetById(id),
				});
				const emp = resData?.data || {};
				setEmployee({
					...emp,
					oldPhoto: emp.photo,
					dob: emp.formattedDob,
				});
			} catch (error) {
				showApiError(error);
			}
		};
		id && fetchEmployeeById(); // fetching data for edit page

		// fetching department list
		const fetchAllDepartment = async () => {
			try {
				const { data: resData } = await Api.post({
					url: urls.departmentGetAllActive(),
				});
				const options = [
					{
						id: "department-",
						label: "Select Department",
						value: "",
					},
					...(resData.data?.map((dpt, i) => ({
						id: "department-" + i,
						label: dpt.name,
						value: dpt.id,
					})) || []),
				];
				setDepartmentOption(options);
			} catch (error) {
				showApiError(error);
			}
		};
		fetchAllDepartment();
	}, [id]);

	const handleEmployeeSubmit = handleSubmit(async (data) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("departmentId", data.departmentId);
		formData.append("dob", data.dob);
		formData.append("phone", data.phone);
		formData.append("email", data.email);
		formData.append("salary", data.salary);
		formData.append("status", data.status ? 1 : 0);
		if (data.id) {
			formData.append("id", data.id);
		}

		// handle image parameter
		if (data.newPhoto instanceof File) {
			formData.append("empPhoto", data.newPhoto);
		} else if (data.newPhoto === null && data.id) {
			// if null that means removed photo
			formData.append("oldPhoto", "");
		} else if (data.id) {
			formData.append("oldPhoto", data.oldPhoto);
		}

		try {
			const { data: resData } = await Api.post({
				url: data.id ? urls.employeeUpdate() : urls.employeeAdd(),
				data: formData,
			});
			showApiResponseToast(resData);
			navigate("/employee");
		} catch (error) {
			showApiError(error);
		}
	});

	const handleImageUpload = useCallback(
		(file) => {
			if (file) {
				setValue("newPhoto", file);
			} else {
				setValue("newPhoto", null);
			}
		},
		[setValue]
	);

	return {
		register,
		handleEmployeeSubmit,
		errors,
		isSubmitting,
		departmentOption,
		handleImageUpload,
		employee,
	};
}
