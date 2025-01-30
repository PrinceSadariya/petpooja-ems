import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import isEqual from "lodash/isEqual";

import Api from "../../utils/api.utils";
import urls from "../../utils/urls.utils";
import { showApiError, showApiResponseToast } from "../../utils/app.utils";

export default function useDepartmentList() {
	const [departmentData, setDepartmentData] = useState([]);
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

	const fetchDepartments = useCallback(
		async (filters = dataFilter) => {
			setIsLoading(true);
			try {
				const { data: resData } = await Api.post({
					url: urls.departmentGet(),
					data: { ...filters },
				});
				const { data, ...newPagination } = resData;
				setDepartmentData(data);
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
		fetchDepartments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const redirectToAddDepartment = useCallback(() => {
		navigate("/department/add");
	}, [navigate]);
	const redirectToEditDepartment = useCallback(
		(dept) => {
			navigate(`/department/edit/${dept.id}`);
		},
		[navigate]
	);

	const openDeleteModal = useCallback((dept) => {
		setDeletingData(dept);
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
				url: urls.departmentDeleteById(deletingData.id),
			});
			showApiResponseToast(resData);
			fetchDepartments();
			closeDeleteModal();
		} catch (error) {
			showApiError(error);
		}
	}, [closeDeleteModal, deletingData.id, fetchDepartments]);

	return {
		departmentData,
		paginationDetails,
		fetchDepartments,
		dataFilter,
		isLoading,
		redirectToAddDepartment,
		redirectToEditDepartment,
		openDeleteModal,
		onConfirmDelete,
		isDeleteModalOpen,
		closeDeleteModal,
	};
}
