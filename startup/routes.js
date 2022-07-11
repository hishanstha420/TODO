const express = require("express");
const tasks = require("../routes/tasks");

module.exports = function routes(app) {
  app.use(express.json());
  app.use("/api/tasks", tasks);
};
