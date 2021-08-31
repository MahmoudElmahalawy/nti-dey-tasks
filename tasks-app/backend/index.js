const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authJwt = require("./helpers/jwt");

// importing environment variables
require("dotenv/config");

const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

const staticFilesDir = path.join(__dirname, "public");

// middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(staticFilesDir));
app.use(authJwt());

// routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// connecting to the database
mongoose
	.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to db successfully ...");
	})
	.catch((err) => {
		console.log(err);
	});

// starting the server
app.listen(process.env.PORT, () => {
	console.log(`Server is up and running at http://localhost:${process.env.PORT}/`);
});
