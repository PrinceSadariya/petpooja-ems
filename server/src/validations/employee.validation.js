const Joi = require("joi");

const employeeAddSchema = Joi.object({
	name: Joi.string().trim().max(50).required(), // name can not be grater than 50 chars
	departmentId: Joi.string().trim().uuid().required(),
	dob: Joi.date().required(),
	email: Joi.string().trim().email().required(),
	phone: Joi.string()
		.trim()
		.pattern(/^[6789]\d{9}$/)
		.required()
		.messages({
			"string.pattern.base": "Phone number must be a valid",
			"any.required": "Phone number is required.",
		}),
	salary: Joi.string().trim().pattern(/^\d+$/).required().messages({
		"string.pattern.base": "Salary must contains only numbers",
		"any.required": "Salary is required.",
	}),
	status: Joi.valid(0, 1, "0", "1").required(),
});

const employeeUpdateSchema = Joi.object({
	id: Joi.string().trim().uuid().required(),
	name: Joi.string().trim().max(50).required(), // name can not be grater than 50 chars
	departmentId: Joi.string().trim().uuid().required(),
	dob: Joi.date().required(),
	email: Joi.string().trim().email().required(),
	phone: Joi.string()
		.trim()
		.pattern(/^[6789]\d{9}$/)
		.required()
		.messages({
			"string.pattern.base": "Phone number must be a valid",
			"any.required": "Phone number is required.",
		}),
	salary: Joi.alternatives([
		Joi.string().trim().pattern(/^\d+$/).messages({
			"string.pattern.base": "Salary must contain only numbers.",
		}),
		Joi.number().integer().positive().messages({
			"number.base": "Salary must be a number.",
			"number.integer": "Salary must be an integer.",
			"number.positive": "Salary must be a positive number.",
		}),
	])
		.required()
		.messages({
			"any.required": "Salary is required.",
		}),
	status: Joi.valid(0, 1, "0", "1").required(),
	oldPhoto: Joi.string().allow(null, ""),
});

const employeeSchema = { employeeAddSchema, employeeUpdateSchema };
module.exports = employeeSchema;
