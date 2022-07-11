const { Task, validate } = require("../models/task");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const task = await Task.find().sort();
  res.send(task);
});

router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send("The task with ID is not found!!!");
  res.send(task);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = new Task({
    taskName: req.body.taskName,
    completed: req.body.completed,
  });
  await task.save();
  res.send(task);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findByIdAndUpdate(req.params.id, {
    $set: {
      taskName: req.body.taskName,
      completed: req.body.completed,
      new: true,
    },
  });
  if (!task) return res.status(404).send("The task with ID isnot available!!!");
  res.send(task);
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);
  if (!task) return res.status(404).send("The task with ID is not found!!!");
  res.send(task);
});

module.exports = router;
