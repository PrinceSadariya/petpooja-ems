import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import isEqual from "lodash/isEqual";

import Api from "../../utils/api.utils";
import urls from "../../utils/urls.utils";
import { showApiError, showApiResponseToast } from "../../utils/app.utils";

export default function useEmployeeList() {
	const [employeeData, setEmployeeData] = useState([]);
	const [paginationDetails, setPaginationDetails] = useState({});
	const [dataFilter, setDataFilter] = useState({
		currentPage: 1,
		pageSize: 10,
		status: 1,
		search: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [deletingData, setDeletingData] = useState({});

	const navigate = useNavigate();

	const fetchEmployees = useCallback(
		async (filters = dataFilter) => {
			setIsLoading(true);
			try {
				const { data: resData } = await Api.post({
					url: urls.employeeGet(),
					data: { ...filters },
				});
				const { data, ...newPagination } = resData;
				setEmployeeData(data);
				setPaginationDetails(newPagination);
				if (!isEqual(filters, dataFilter)) {
					setDataFilter(filters);
				}
			} catch (error) {
				showApiError(error);
			}
			setIsLoading(false);
		},
		[dataFilter]
	);

	useEffect(() => {
		fetchEmployees();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const redirectToAddEmployee = useCallback(() => {
		navigate("/employee/add");
	}, [navigate]);
	const redirectToEditEmployee = useCallback(
		(emp) => {
			navigate(`/employee/edit/${emp.id}`);
		},
		[navigate]
	);

	const openDeleteModal = useCallback((emp) => {
		setDeletingData(emp);
		setIsDeleteModalOpen(true);
	}, []);
	const closeDeleteModal = useCallback(() => {
		setIsDeleteModalOpen(false);
	}, []);

	const onConfirmDelete = useCallback(async () => {
		if (!deletingData.id) {
			return;
		}
		try {
			const { data: resData } = await Api.delete({
				url: urls.employeeDeleteById(deletingData.id),
			});
			showApiResponseToast(resData);
			fetchEmployees();
			closeDeleteModal();
		} catch (error) {
			showApiError(error);
		}
	}, [closeDeleteModal, deletingData.id, fetchEmployees]);

	return {
		employeeData,
		paginationDetails,
		fetchEmployees,
		dataFilter,
		isLoading,
		redirectToAddEmployee,
		redirectToEditEmployee,
		openDeleteModal,
		onConfirmDelete,
		isDeleteModalOpen,
		closeDeleteModal,
	};
}
