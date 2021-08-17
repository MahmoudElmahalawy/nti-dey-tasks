const express = require("express");

const router = express.Router();

const Task = require("../models/task.model");

router.get("/showAllTasks", (req, res) => {
	Task.find()
		.then((tasks) => res.status(200).send(tasks))
		.catch((err) => res.status(400).send(err));
});
router.get("/showAllTasks/:id", (req, res) => {
	Task.findById(req.params.id)
		.then((task) => res.status(200).send(task))
		.catch((err) => res.status(400).send(err));
});

router.post("/addTask", (req, res) => {
	const { title, content, dueDate } = req.body;
	// const dueDate = Date.now();
	// const [title, content] = ["Task 2", "Task 2 content"];

	const task = new Task({
		title,
		content,
		dueDate,
	});

	task.save()
		.then((task) => {
			return res.status(200).send(task);
		})
		.catch((err) => {
			return res.status(400).send(err);
		});
});

// Only dueDate can be updated
router.patch("/editTask/:id", (req, res) => {
	const { dueDate } = req.body;

	Task.findByIdAndUpdate(req.params.id, { dueDate }, { new: true })
		.then((task) => {
			if (!task) {
				return res.status(404).json({ success: false, message: "Task with the given id was not found!" });
			}
			return res.status(200).send(task);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

router.delete("/deleteTask/:id", (req, res) => {
	Task.findByIdAndDelete(req.params.id).then(() => {
		res.status(200)
			.send({ success: true, message: "Task deleted successfully." })
			.catch((err) => {
				res.status(400).send({ success: false, err });
			});
	});
});

module.exports = router;
