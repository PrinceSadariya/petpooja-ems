const router = require("express").Router();

router.use("/department", require("./department.route")); //department routes
router.use("/employee", require("./employee.route")); //employee routes
router.use("/stats", require("./stats.route")); //statistics routes

module.exports = router;
