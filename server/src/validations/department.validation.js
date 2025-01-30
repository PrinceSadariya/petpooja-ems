const Joi = require("joi");

const departmentAddSchema = Joi.object({
	name: Joi.string().trim().max(50).required(), // name can not be grater than 50 chars
	status: Joi.valid(0, 1).required(),
});
const departmentUpdateSchema = Joi.object({
	id: Joi.string().trim().uuid(), // sql uuid
	name: Joi.string().trim().max(50).required(),
	status: Joi.valid(0, 1).required(),
});

const departmentSchema = { departmentAddSchema, departmentUpdateSchema };
module.exports = departmentSchema;
