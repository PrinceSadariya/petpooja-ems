const HTTP_STATUS = require("./statusCode.utils");
const fs = require("fs");

// asyncHandler is a higher order function to wrap try catch part of all functions
const asyncHandler = (func) => async (req, res, next) => {
	try {
		const data = await func(req, res, next);
		return data;
	} catch (error) {
		if (req.file) {
			// removing uploaded file if any error occurred
			fs.unlink(req.file.path, () => {});
		}
		return res
			.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
			.json({
				success: false,
				status: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
				message: error.message,
			});
	}
};

module.exports = asyncHandler;
