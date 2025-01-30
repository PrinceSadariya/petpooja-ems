import React from "react";
import PropTypes from "prop-types";

export default function DepartmentYoungEmployee({ data }) {
	return (
		<div className="">
			<h2 className="text-lg text-center">
				Youngest Employees by Department
			</h2>
			<div className="overflow-x-auto mt-3">
				<table className="w-full bg-white border border-gray-300 table-auto">
					<thead>
						<tr className="bg-gray-400">
							<th className="px-4 py-2 text-left text-sm font-semibold ">
								Department
							</th>
							<th className="px-4 py-2 text-left text-sm font-semibold ">
								Name
							</th>
							<th className="px-4 py-2 text-left text-sm font-semibold ">
								Age
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((department, deptIndex) => {
							const employees = department.employees;
							const rowspan =
								employees.length > 1 ? employees.length : 1;

							return (
								<React.Fragment key={deptIndex}>
									{employees.length > 0 ? (
										employees.map((employee, empIndex) => (
											<tr
												key={empIndex}
												className={`${
													empIndex === 0
														? "border-t border-b border-gray-300"
														: "border-b border-gray-300"
												}`}
											>
												{empIndex === 0 ? (
													// First row of a department (with rowspan for department)
													<td
														rowSpan={rowspan}
														className="px-4 py-2 text-left text-sm font-medium  bg-gray-50 border-r border-gray-300"
													>
														{
															department.departmentName
														}
													</td>
												) : null}
												<td className="px-4 py-2 text-sm ">
													{employee.employeeName}
												</td>
												<td className="px-4 py-2 text-sm ">
													{employee.age}
												</td>
											</tr>
										))
									) : (
										<tr className="border-t border-b border-gray-300">
											<td
												rowSpan={rowspan}
												className="px-4 py-2 text-left text-sm font-medium  bg-gray-50 border-r border-gray-300"
											>
												{department.departmentName}
											</td>
											<td
												colSpan="2"
												className="px-4 py-2 text-center text-sm font-medium"
											>
												-
											</td>
										</tr>
									)}
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

DepartmentYoungEmployee.propTypes = {
	data: PropTypes.array,
};
