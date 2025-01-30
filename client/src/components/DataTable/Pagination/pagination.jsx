import PropTypes from "prop-types";

import usePagination from "./usePagination";
import FormSelect from "../../form/FormSelect";
import FormInput from "../../Form/FormInput/formInput";

const _paginationOptions = [
	{ id: "1000", label: "10", value: 10 },
	{ id: "1001", label: "25", value: 25 },
	{ id: "1002", label: "50", value: 50 },
	{ id: "1003", label: "100", value: 100 },
];

export default function Pagination({
	paginationDetails,
	dataFilter,
	fetchData,
}) {
	const {
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
	} = usePagination({
		paginationDetails,
		dataFilter,
		fetchData,
	});
	return (
		<div className="mt-3 flex justify-between">
			<div className="space-x-4">
				<span>
					Showing {from} to {to} of {totalCount} entries
				</span>
				<FormSelect
					id="pageSizeSelect"
					onChange={onPageSizeChange}
					options={_paginationOptions}
					className="text-center p-0 ps-0"
					value={pageSize || ""}
					containerClass="inline-block mt-0 w-fit"
				/>
			</div>
			<div className="flex items-center space-x-3">
				<button
					onClick={() => {
						onPageChange(currentPage - 1);
					}}
					className="disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={activeCurrentPage === 1}
				>
					<i className="bx bxs-right-arrow bx-rotate-180"></i>
				</button>

				<div className="space-x-1">
					<span>Page</span>
					<form
						className="inline-block"
						onSubmit={(e) => onPageChange(e, true)}
					>
						<FormInput
							type="number"
							name="pageNum"
							id="pageNum"
							className="text-center p-0 w-10"
							containerClass="mt-0"
							value={currentPage || ""}
							onChange={handleSetCurrentPageChange}
							onBlur={onBlurPageInput}
							min={1}
							max={totalPage}
							required
						/>
					</form>
					<span>of</span>
					<span>{totalPage || "X"}</span>
				</div>
				<button
					onClick={() => {
						onPageChange(currentPage + 1);
					}}
					className="disabled:opacity-50 disabled:cursor-not-allowed "
					disabled={!hasMore}
				>
					<i className="bx bxs-right-arrow"></i>
				</button>
			</div>
		</div>
	);
}

Pagination.propTypes = {
	paginationDetails: PropTypes.object,
	dataFilter: PropTypes.object,
	fetchData: PropTypes.func,
};
