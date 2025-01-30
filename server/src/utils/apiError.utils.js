class ApiError extends Error {
	constructor(
		statusCode = 500,
		message = "Something went wrong!",
		errors = []
	) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.errors = errors;
		this.data = null;
		this.success = false;
	}
}

module.exports = ApiError;
