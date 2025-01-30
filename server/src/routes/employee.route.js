const employeeController = require("../controllers/employee.controller");
const upload = require("../middlewares/multer.middleware");
const validate = require("../middlewares/validate.middleware");
const employeeSchema = require("../validations/employee.validation");

const router = require("express").Router();

/**
 * request for get employee with pagination
 * POST : "/employee/get"
 */
router.post("/get", employeeController.employeeGet);

/**
 * request for get employee by id
 * POST : "/employee/get/:id"
 */
router.post("/get/:id", employeeController.employeeGetById);

/**
 * request for add an employee
 * POST : "/employee/add"
 */
router.post(
	"/add",
	upload.single("empPhoto"),
	validate(employeeSchema.employeeAddSchema),
	employeeController.employeeAdd
);

/**
 * request for update an employee
 * POST : "/employee/update"
 */
router.post(
	"/update",
	upload.single("empPhoto"),
	validate(employeeSchema.employeeUpdateSchema),
	employeeController.employeeUpdate
);

/**
 * request for delete an employee
 * POST : "/employee/delete/:id"
 */
router.post(
	"/delete/:id",
	employeeController.employeeDeleteById
);

module.exports = router;
