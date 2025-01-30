import { useEffect, useState } from "react";

export default function usePagination({
	paginationDetails,
	dataFilter,
	fetchData,
}) {
	// defining values from pagination object
	const totalCount = paginationDetails.totalCount;
	const pageSize = paginationDetails.pageSize;
	const totalPage = paginationDetails.totalPage;
	const hasMore = paginationDetails.hasMore;

	const [currentPage, setCurrentPage] = useState(
		paginationDetails.currentPage
	);
	const activeCurrentPage = paginationDetails.currentPage;

	useEffect(() => {
		setCurrentPage(paginationDetails.currentPage);
	}, [paginationDetails.currentPage]);

	// starting index of page
	const from = (activeCurrentPage - 1) * pageSize + 1;

	// last index of page
	let to = activeCurrentPage * pageSize;
	to = to <= totalCount ? to : totalCount;

	const handleSetCurrentPageChange = (event) => {
		setCurrentPage(event.target.value);
	};

	const onPageSizeChange = (event) => {
		const newPage =
			Math.floor(
				((currentPage - 1) * pageSize + 1) / event.target.value
			) + 1;

		const newDataFilter = {
			...dataFilter,
			currentPage: newPage,
			pageSize: event.target.value,
		};

		fetchData(newDataFilter);
	};

	const onPageChange = (e, isForm = false) => {
		// if isForm is true then e is form event
		if (isForm) {
			e.preventDefault();
			const newFilter = {
				...dataFilter,
				currentPage: e.target[0].value,
			};
			fetchData(newFilter);
		} else {
			//else e is pageNumber
			const newFilter = { ...dataFilter, currentPage: e };
			fetchData(newFilter);
		}
	};

	const onBlurPageInput = () => {
		setCurrentPage(activeCurrentPage);
	};
	return {
		from,
		to,
		currentPage,
		totalCount,
		pageSize,
		totalPage,
		hasMore,
		onPageSizeChange,
		onPageChange,
		handleSetCurrentPageChange,
		activeCurrentPage,
		onBlurPageInput,
	};
}
