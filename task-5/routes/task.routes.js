const express = require("express");

const router = express.Router();

const Task = require("../models/task.model");

const { showAllTasks, showTask, addTask, editTask, deleteTask } = require("../controllers/task.controllers");

router.get("/showAllTasks", showAllTasks);

router.get("/showAllTasks/:id", showTask);

router.post("/addTask", addTask);

// Only dueDate can be updated
router.patch("/editTask/:id", editTask);

router.delete("/deleteTask/:id", deleteTask);

module.exports = router;
