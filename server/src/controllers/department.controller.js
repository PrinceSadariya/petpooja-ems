const departmentService = require("../service/department.service");
const {
	ApiResponse,
	ApiPagingResponse,
} = require("../utils/apiResponse.utils");
const asyncHandler = require("../utils/asyncHandler.utils");
const HTTP_STATUS = require("../utils/statusCode.utils");

const departmentGet = asyncHandler(async (req, res) => {
	const { currentPage, pageSize, search, status } = req.body;

	const departments = await departmentService.departmentGet({
		currentPage,
		pageSize,
		search,
		status,
	});

	return res
		.status(HTTP_STATUS.OK)
		.json(
			new ApiPagingResponse(
				departments,
				"Departments fetched",
				HTTP_STATUS.OK
			)
		);
});

const departmentGetById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const departments = await departmentService.departmentGetById({
		id,
	});

	return res
		.status(HTTP_STATUS.OK)
		.json(
			new ApiResponse(departments, "Departments fetched", HTTP_STATUS.OK)
		);
});

const departmentGetAll = asyncHandler(async (req, res) => {
	// const { currentPage, pageSize } = req.body;

	const departments = await departmentService.departmentGetAll();

	return res
		.status(HTTP_STATUS.OK)
		.json(
			new ApiResponse(departments, "Departments fetched", HTTP_STATUS.OK)
		);
});

const departmentAdd = asyncHandler(async (req, res) => {
	const { name, status } = req.body;

	const department = await departmentService.departmentAdd({ name, status });
	return res
		.status(HTTP_STATUS.CREATED)
		.json(
			new ApiResponse(department, "Department added", HTTP_STATUS.CREATED)
		);
});

const departmentUpdate = asyncHandler(async (req, res) => {
	const { id, name, status } = req.body;

	const department = await departmentService.departmentUpdate({
		id,
		name,
		status,
	});
	return res
		.status(HTTP_STATUS.OK)
		.json(
			new ApiResponse(department, "Department updated", HTTP_STATUS.OK)
		);
});

const departmentDeleteById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const department = await departmentService.departmentDeleteById({
		id,
	});
	return res
		.status(HTTP_STATUS.OK)
		.json(
			new ApiResponse(department, "Department deleted", HTTP_STATUS.OK)
		);
});

const departmentController = {
	departmentAdd,
	departmentGet,
	departmentGetById,
	departmentGetAll,
	departmentUpdate,
	departmentDeleteById,
};
module.exports = departmentController;
