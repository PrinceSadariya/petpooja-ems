const statsController = require("../controllers/status.controller");

const router = require("express").Router();

/**
 * request for get stats of max salary
 * POST : "/status/department-wise-max-salary"
 */
router.get(
	"/department-wise-max-salary",
	statsController.departmentWiseMaxSalary
);

/**
 * request for get salary range wise
 * POST : "/status/salary-range-wise-count"
 */
router.get("/salary-range-wise-count", statsController.salaryRangeWiseCount);

/**
 * request for get youngest employee department wise
 * POST : "/status/department-wise-youngest-employee"
 */
router.get(
	"/department-wise-youngest-employee",
	statsController.departmentWiseYoungestEmployee
);

module.exports = router;
