const mongoose = require("mongoose");
const router = require("express").Router();

const User = require("../models/user.model");
const Task = require("../models/task.model");

// get all tasks
router.get("/", (req, res) => {
	Task.find()
		.populate("notes")
		.then((tasks) => {
			return res.status(200).json({ success: true, tasks });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// get all tasks of an employee
router.get("/employee/:empId", (req, res) => {
	console.log(req.originalUrl);
	Task.find({ employeeAssigned: req.params.empId })
		.populate("notes")
		.then((tasks) => {
			return res.status(200).json({ success: true, tasks });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// get specific task
router.get("/:taskId", (req, res) => {
	Task.findById(req.params.taskId)
		.populate("notes")
		.then((task) => {
			return res.status(200).json({ success: true, task });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// add new task
router.post("/manager/:managerId", (req, res) => {
	const { type, dueDate } = req.body;
	const managerCreated = req.params.managerId;

	const task = new Task({ type, dueDate, managerCreated });

	task.save()
		.then((task) => {
			return res.status(200).json({ success: true, task });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// assign task to employee
router.put("/assign/:taskId/employee/:empId", (req, res) => {
	User.findById(req.params.empId)
		.then((employee) => {
			Task.findById(req.params.taskId)
				.then((task) => {
					task.employeeAssigned = req.params.empId;
					task.save()
						.then((task) => {
							employee.tasks.push(task);
							employee
								.save()
								.then((employee) => {
									return res.status(200).json({ success: true, employee });
								})
								.catch((e) => {
									return res.status(400).json({ success: false, error: e });
								});
						})
						.catch((e) => {
							return res.status(400).json({ success: false, error: e });
						});
				})
				.catch((e) => {
					return res.status(400).json({ success: false, error: "Task with provided id was not found" });
				});
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// add note to task
router.put("/note/:taskId/employee/:empId", (req, res) => {
	Task.findById(req.params.taskId)
		.then((task) => {
			const { employeeNote } = req.body;

			task.notes.push({ employeeNote, employeeId: req.params.empId });
			task.save()
				.then((task) => {
					return res.status(200).json({ success: true, task });
				})
				.catch((e) => {
					return res.status(400).json({ success: false, error: e });
				});
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// edit task
router.patch("/:taskId", (req, res) => {
	Task.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
		.then((task) => {
			return res.status(200).json({ success: true, task });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

// delete task
router.delete("/:id", (req, res) => {
	Task.findByIdAndDelete(req.params.id)
		.then((task) => {
			return res.status(200).json({ success: true, task });
		})
		.catch((e) => {
			return res.status(400).json({ success: false, error: e });
		});
});

module.exports = router;
