const ApiError = require("../utils/apiError.utils");
const asyncHandler = require("../utils/asyncHandler.utils");
const HTTP_STATUS = require("../utils/statusCode.utils");
const fs = require("fs");

const validate = (schema) =>
	asyncHandler((req, res, next) => {
		const { error, value } = schema.validate(req.body, {
			abortEarly: false,
		});
		if (error) {
			if (req.file) {
				// removing uploaded file if error occurred
				fs.unlink(req.file.path, () => {});
			}
			throw new ApiError(
				HTTP_STATUS.BAD_REQUEST,
				error.details[0].message,
				error.details
			);
		}
		req.body = { ...req.body, ...value };
		next();
	});

module.exports = validate;
