const statsService = require("../service/stats.service");
const { ApiResponse } = require("../utils/apiResponse.utils");
const asyncHandler = require("../utils/asyncHandler.utils");
const HTTP_STATUS = require("../utils/statusCode.utils");

const departmentWiseMaxSalary = asyncHandler(async (req, res) => {
	const data = await statsService.departmentWiseMaxSalary();
	return res.status(HTTP_STATUS.OK).json(new ApiResponse(data));
});

const salaryRangeWiseCount = asyncHandler(async (req, res) => {
	const data = await statsService.salaryRangeWiseCount();
	return res.status(HTTP_STATUS.OK).json(new ApiResponse(data));
});

const departmentWiseYoungestEmployee = asyncHandler(async (req, res) => {
	const data = await statsService.departmentWiseYoungestEmployee();

	// merging data if there is 2 employee in same department
	const mergedData = [];
	data.forEach((employee) => {
		const department = mergedData.find(
			(d) => d.departmentName === employee.departmentName
		);
		if (department) {
			department.employees.push({
				employeeName: employee.employeeName,
				age: employee.age,
			});
		} else {
			mergedData.push({
				departmentName: employee.departmentName,
				employees: [
					{
						employeeName: employee.employeeName,
						age: employee.age,
					},
				],
			});
		}
	});
	return res.status(HTTP_STATUS.OK).json(new ApiResponse(mergedData));
});

const statsController = {
	departmentWiseMaxSalary,
	salaryRangeWiseCount,
	departmentWiseYoungestEmployee,
};
module.exports = statsController;
