const Joi = require("joi");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

validateTask = (task) => {
  const schema = Joi.object({
    taskName: Joi.string().min(3).required(),
    completed: Joi.boolean(),
  });
  return schema.validate(task);
};

exports.Task = Task;
exports.validate = validateTask;
