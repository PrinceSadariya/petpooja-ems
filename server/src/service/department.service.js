const { pool } = require("../config/db");
const ApiError = require("../utils/apiError.utils");
const HTTP_STATUS = require("../utils/statusCode.utils");

const departmentGet = async ({
	currentPage,
	pageSize = 10,
	search = "",
	status = 1,
}) => {
	currentPage = isNaN(currentPage) ? 1 : Number(currentPage);
	pageSize = isNaN(pageSize) ? 10 : Number(pageSize);
	status = isNaN(status) ? 1 : status;
	const offset = (currentPage - 1) * pageSize;
	const searchQuery = `%${search}%`;

	const [rows, fields] = await pool
		.promise()
		.query(
			"SELECT * FROM department WHERE name LIKE ? AND status = ? ORDER BY name LIMIT ? OFFSET ?",
			[searchQuery, status, pageSize, offset]
		);

	const [countResult] = await pool
		.promise()
		.query(
			"SELECT COUNT(*) as total FROM department WHERE name LIKE ? AND status = ?",
			[searchQuery, status]
		);

	const totalCount = countResult[0].total;
	const paging = {
		currentPage,
		pageSize,
		totalPage: Math.ceil(totalCount / pageSize),
		totalCount,
		hasMore: offset + pageSize < totalCount,
	};

	return {
		paging,
		data: rows,
	};
};

const departmentGetById = async ({ id }) => {
	const [countResult] = await pool
		.promise()
		.query("SELECT COUNT(*) as total FROM department WHERE id=?", [id]);

	const totalCount = countResult[0].total;
	if (!totalCount) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, "Department not found");
	}

	const [rows] = await pool
		.promise()
		.query("SELECT * FROM department WHERE id=?", [id]);
	return rows[0];
};

const departmentGetAll = async () => {
	const [rows] = await pool
		.promise()
		.query(
			"SELECT id,name FROM department WHERE status=1 ORDER BY name ASC"
		);
	return rows;
};

const departmentAdd = async ({ name, status }) => {
	const [result] = await pool
		.promise()
		.query("INSERT INTO department (id,name,status) VALUES (UUID(),?,?)", [
			name,
			status,
		]);
	return true;
};

const departmentUpdate = async ({ id, name, status }) => {
	const [result] = await pool
		.promise()
		.query(
			"UPDATE department SET name=?, status=?, modified_at=NOW() WHERE id=?",
			[name, status, id]
		);
	return true;
};

const departmentDeleteById = async ({ id }) => {
	const [countResult] = await pool
		.promise()
		.query("SELECT COUNT(*) as total FROM department WHERE id=?", [id]);

	const totalCount = countResult[0].total;
	if (!totalCount) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, "Department not found");
	}

	const [result] = await pool
		.promise()
		.query("DELETE FROM department WHERE id=?", [id]);

	return true;
};

const departmentService = {
	departmentGet,
	departmentGetById,
	departmentAdd,
	departmentGetAll,
	departmentUpdate,
	departmentDeleteById,
};
module.exports = departmentService;
