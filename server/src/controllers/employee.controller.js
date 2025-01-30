const employeeService = require("../service/employee.service");
const {
	ApiResponse,
	ApiPagingResponse,
} = require("../utils/apiResponse.utils");
const asyncHandler = require("../utils/asyncHandler.utils");
const HTTP_STATUS = require("../utils/statusCode.utils");

const employeeGet = asyncHandler(async (req, res) => {
	const { currentPage, pageSize, search, status } = req.body;

	const employees = await employeeService.employeeGet({
		currentPage,
		pageSize,
		search,
		status,
	});

	return res
		.status(HTTP_STATUS.OK)
		.json(
			new ApiPagingResponse(
				employees,
				"Employees fetched",
				HTTP_STATUS.OK
			)
		);
});

const employeeGetById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const employee = await employeeService.employeeGetById({
		id,
	});

	return res
		.status(HTTP_STATUS.OK)
		.json(new ApiResponse(employee, "Employee fetched", HTTP_STATUS.OK));
});

const employeeAdd = asyncHandler(async (req, res) => {
	const { name, departmentId, dob, phone, email, salary, status } = req.body;
	let photo;
	if (req.file) {
		photo = req.file.filename;
	}
	const emp = await employeeService.employeeAdd({
		name,
		departmentId,
		dob,
		email,
		phone,
		salary,
		status,
		photo,
	});

	return res
		.status(HTTP_STATUS.CREATED)
		.json(new ApiResponse(emp, "Employee added", HTTP_STATUS.CREATED));
});

const employeeUpdate = asyncHandler(async (req, res) => {
	const {
		id,
		name,
		departmentId,
		dob,
		phone,
		email,
		salary,
		status,
		oldPhoto,
	} = req.body;
	let photo;
	if (req.file) {
		photo = req.file.filename;
	} else {
		photo = oldPhoto;
	}
	const emp = await employeeService.employeeUpdate({
		id,
		name,
		departmentId,
		dob,
		email,
		phone,
		salary,
		status,
		photo,
	});

	return res
		.status(HTTP_STATUS.OK)
		.json(new ApiResponse(emp, "Employee updated", HTTP_STATUS.OK));
});

const employeeDeleteById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const emp = await employeeService.employeeDeleteById({
		id,
	});
	return res
		.status(HTTP_STATUS.OK)
		.json(new ApiResponse(department, "Employee deleted", HTTP_STATUS.OK));
});

const employeeController = {
	employeeAdd,
	employeeGet,
	employeeUpdate,
	employeeGetById,
	employeeDeleteById,
};
module.exports = employeeController;
