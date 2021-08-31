const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		match: /[a-z]/i,
		trim: true,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		match: /^\d{11}$/,
		required: true,
	},
	position: {
		type: String,
		enum: ["manager", "employee"],
		required: true,
	},
	jobTitle: {
		type: String,
	},
	profileImage: {
		type: String,
	},
	isSuspended: {
		type: Boolean,
		default: false,
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task",
		},
	],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
