require("dotenv").config();

const { pool } = require("../config/db");
const ApiError = require("../utils/apiError.utils");
const HTTP_STATUS = require("../utils/statusCode.utils");
const fs = require("fs");
const path = require("path");

const employeeGet = async ({
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

	const query = `SELECT 
                        e.id,
                        e.name AS name,
                        e.department_id AS departmentId,
                        d.name AS departmentName,
                        e.dob AS dob,
                        DATE_FORMAT(e.dob, '%Y-%m-%d') AS formattedDob,
                        e.email AS email,
                        e.phone AS phone,
                        e.salary AS salary,
                        e.status AS status,
                        e.photo AS photo
                    FROM employee e
                    LEFT JOIN department d ON d.id=e.department_id 
                    WHERE e.name LIKE ? AND e.status = ? LIMIT ? OFFSET ?`;
	const [rows, fields] = await pool
		.promise()
		.query(query, [searchQuery, status, pageSize, offset]);

	const [countResult] = await pool
		.promise()
		.query(
			"SELECT COUNT(*) as total FROM employee WHERE name LIKE ? AND status = ?",
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

const employeeGetById = async ({ id }) => {
	const [countResult] = await pool
		.promise()
		.query("SELECT COUNT(*) as total FROM employee WHERE id=?", [id]);

	const totalCount = countResult[0].total;
	if (!totalCount) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, "Employee not found");
	}

	const query = `SELECT 
                        e.id,
                        e.name AS name,
                        e.department_id AS departmentId,
                        d.name AS departmentName,
                        e.dob AS dob,
                        DATE_FORMAT(e.dob, '%Y-%m-%d') AS formattedDob,
                        e.email AS email,
                        e.phone AS phone,
                        e.salary AS salary,
                        e.status AS status,
                        e.photo AS photo
                    FROM employee e
                    LEFT JOIN department d ON d.id=e.department_id
                    WHERE e.id=?`;
	const [rows] = await pool.promise().query(query, [id]);
	return rows[0];
};

const employeeAdd = async ({
	name,
	departmentId,
	dob,
	phone,
	email,
	salary,
	status,
	photo = "",
}) => {
	// checking for if email exist
	const [countResult] = await pool
		.promise()
		.query("SELECT COUNT(*) as total FROM employee WHERE email=?", [email]);

	const totalCount = countResult[0].total;
	if (totalCount) {
		throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Email already exist");
	}

	// add employee
	const [data] = await pool
		.promise()
		.query(
			"INSERT INTO employee VALUES(UUID(),?,?,?,?,?,?,?,?,NOW(),NOW())",
			[name, departmentId, dob, phone, photo, email, salary, status]
		);

	return true;
};

const employeeUpdate = async ({
	id,
	name,
	departmentId,
	dob,
	phone,
	email,
	salary,
	status,
	photo = "",
}) => {
	// checking for if id exist
	const [countResult1] = await pool
		.promise()
		.query("SELECT COUNT(*) as total, photo FROM employee WHERE id=?", [
			id,
		]);

	const totalCount1 = countResult1[0].total;
	if (!totalCount1) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, "Employee not found");
	}

	// checking for if email exist
	const [countResult2] = await pool
		.promise()
		.query(
			"SELECT COUNT(*) as total FROM employee WHERE email=? AND id!=?",
			[email, id]
		);

	const totalCount2 = countResult2[0].total;
	if (totalCount2) {
		throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Email already exist");
	}

	// deleting old employee photo if necessary
	if (!photo && countResult1[0].photo) {
		fs.unlink(
			path.resolve(
				process.env.PROJECT_ROOT_PATH,
				"client/public/",
				countResult1[0].photo
			),
			(err) => {
				console.log(err);
			}
		);
	}

	const query = `UPDATE employee
                    SET
                        name=?,
                        department_id=?,
                        dob=?,
                        email=?,
                        phone=?,
                        salary=?,
                        status=?,
                        photo=?
                    WHERE id=?
    `;
	// add employee
	const [data] = await pool
		.promise()
		.query(query, [
			name,
			departmentId,
			dob,
			email,
			phone,
			salary,
			status,
			photo,
			id,
		]);

	return true;
};

const employeeDeleteById = async ({ id }) => {
	const [countResult] = await pool
		.promise()
		.query("SELECT COUNT(*) as total,photo FROM employee WHERE id=?", [id]);

	const totalCount = countResult[0].total;
	if (!totalCount) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, "Department not found");
	}

	// remove employee photo
	if (countResult[0].photo) {
		fs.unlink(
			path.resolve(
				process.env.PROJECT_ROOT_PATH,
				"client/public/",
				countResult[0].photo
			),
			(err) => {
				console.log(err);
			}
		);
	}

	const [result] = await pool
		.promise()
		.query("DELETE FROM employee WHERE id=?", [id]);

	return true;
};

const employeeService = {
	employeeAdd,
	employeeGet,
	employeeUpdate,
	employeeGetById,
	employeeDeleteById,
};
module.exports = employeeService;
