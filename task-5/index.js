const express = require("express");
const mongoose = require("mongoose");

const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tasks", taskRoutes);

//connecting to the database
mongoose
	.connect("mongodb://localhost:27017/nti-tasks", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Connected to db successfully ...");
	})
	.catch((err) => {
		console.log(err);
	});

//starting the server
app.listen(3000, () => {
	console.log("Server is up and running at http://localhost:3000/");
});
