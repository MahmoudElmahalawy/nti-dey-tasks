const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	dueDate: {
		type: Date,
		required: true,
		min: Date.now(),
	},
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
