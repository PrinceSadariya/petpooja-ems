require("dotenv").config();

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: "*" })); // CORS
app.use(express.json({ limit: "16kb" })); // middleware for body parsing

app.use("/", require("./src/routes")); // all routes

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
