const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
	},
	dueDate: {
		type: Date,
		min: new Date(),
		required: true,
	},
	employeeAssigned: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	managerCreated: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	status: {
		type: String,
		default: "Processing",
	},
	notes: [
		{
			employeeNote: String,
			employeeId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		},
	],
	descriptionFile: {
		type: String,
	},
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
