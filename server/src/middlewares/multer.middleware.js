require("dotenv").config();

const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		// path to upload images in directly react's public folder
		// so we can access it direct in react
		const uploadPath = path.join(
			process.env.PROJECT_ROOT_PATH,
			"/client/public"
		);
		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		const newFileName =
			Date.now() +
			"-" +
			Math.round(Math.random() * 100000) +
			path.extname(file.originalname);
		cb(null, newFileName);
	},
});

const upload = multer({
	storage: multerStorage,
	limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
