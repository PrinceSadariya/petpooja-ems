const router = require("express").Router();

router.use("/department", require("./department.route")); //department routes
router.use("/employee", require("./employee.route")); //employee routes

module.exports = router;
