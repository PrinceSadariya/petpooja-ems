const departmentController = require("../controllers/department.controller");
const validate = require("../middlewares/validate.middleware");
const departmentSchema = require("../validations/department.validation");

const router = require("express").Router();

/**
 * request for get departments with pagination
 * POST : "/department/get"
 */
router.post("/get", departmentController.departmentGet);

/**
 * request for get department by id
 * POST : "/department/get/:id"
 */
router.post("/get/:id", departmentController.departmentGetById);

/**
 * request for get all active departments
 * POST : "/department/all"
 */
router.post("/all", departmentController.departmentGetAll);

/**
 * request for add a department
 * POST : "/department/add"
 */
router.post(
	"/add",
	validate(departmentSchema.departmentAddSchema),
	departmentController.departmentAdd
);

/**
 * request for update a department
 * POST : "/department/update"
 */
router.post(
	"/update",
	validate(departmentSchema.departmentUpdateSchema),
	departmentController.departmentUpdate
);

/**
 * request for delete a department
 * POST : "/department/delete"
 */
router.delete("/delete/:id", departmentController.departmentDeleteById);

module.exports = router;
