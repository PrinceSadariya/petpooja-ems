import PropTypes from "prop-types";
import size from "lodash/size";

import Button from "../Button";
import Pagination from "./Pagination";
import FormSelect from "../form/FormSelect";
import SearchInput from "../SearchInput";

const _statusOption = [
	{ id: "2001", label: "Active", value: 1 },
	{ id: "2002", label: "InActive", value: 0 },
];

export default function DataTable({
	tableData,
	paginationDetails,
	dataFilter,
	fetchData,
	tableColumns,
	primaryKey,
	onAdd,
	onEdit,
	onDelete,
	isLoading,
	btnText,
}) {
	const columnKeys = Object.keys(tableColumns);

	return (
		<div className="h-full max-w-7xl mx-auto rounded bg-white p-4 shadow">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-x-3">
					<SearchInput
						fetchData={fetchData}
						dataFilter={dataFilter}
					/>
				</div>
				<div className="flex justify-center space-x-3">
					<FormSelect
						onChange={(e) => {
							fetchData({
								...dataFilter,
								currentPage: 1,
								status: e.target.value,
							});
						}}
						options={_statusOption}
						className="h-full p-0 ps-0 text-center"
						value={dataFilter.status}
						containerClass="inline-block mt-0 w-fit"
					/>
					{btnText && (
						<Button
							onClick={() => onAdd()}
							text={btnText}
							containerClass="mt-0"
							color="red-600"
						/>
					)}
				</div>
			</div>
			<div className="mt-4 h-[calc(100%-86px)] overflow-y-auto">
				<table className="w-full">
					<thead className="sticky top-0 bg-gray-200">
						<tr>
							<th
								className={`p-3 text-left font-semibold capitalize tracking-wider w-20`}
							>
								<span className="">#</span>
							</th>
							{columnKeys.map((clm, index) => {
								return (
									<th
										key={clm + index}
										className={`p-3 text-left font-semibold capitalize tracking-wider`}
									>
										<span className="">
											{tableColumns[clm]}
										</span>
									</th>
								);
							})}
							<th className="w-24 p-3 text-center font-semibold capitalize tracking-wider">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{isLoading ? (
							<tr className="text-center font-semibold">
								<td
									colSpan={size(columnKeys) + 2}
									className="h-14 whitespace-nowrap"
								>
									Data Loading...
								</td>
							</tr>
						) : size(tableData) ? (
							tableData?.map((td, i) => {
								return (
									<tr key={td[primaryKey]}>
										<td className="p-3">{i + 1}</td>
										{columnKeys.map((clm) => {
											return (
												<td
													key={`${td[primaryKey]}-${clm}`}
													className="p-3"
												>
													{td[clm] || " - "}
												</td>
											);
										})}
										<td className="whitespace-nowrap p-2">
											<div className="flex items-center justify-center space-x-2">
												<button
													type="button"
													onClick={() => onEdit(td)}
													className="bg-blue-600 text-white rounded p-1 text-xs"
												>
													Edit
												</button>
												<button
													type="button"
													onClick={() => onDelete(td)}
													className="bg-red-600 text-white rounded p-1 text-xs"
												>
													Delete
												</button>
											</div>
										</td>
									</tr>
								);
							})
						) : (
							<tr className="text-center font-semibold">
								<td
									colSpan={size(columnKeys) + 1}
									className="h-14 whitespace-nowrap"
								>
									No Data Available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<hr />
			{/* Pagination */}
			{!!size(tableData) && (
				<Pagination
					paginationDetails={paginationDetails}
					dataFilter={dataFilter}
					fetchData={fetchData}
				/>
			)}
		</div>
	);
}

DataTable.propTypes = {
	tableData: PropTypes.array,
	tableColumns: PropTypes.object,
	paginationDetails: PropTypes.object,
	dataFilter: PropTypes.object,
	fetchData: PropTypes.func,
	primaryKey: PropTypes.string,
	onAdd: PropTypes.func,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	isLoading: PropTypes.bool,
	btnText: PropTypes.string,
};
