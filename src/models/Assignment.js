const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  employeeEmail: { type: String, required: true },
  secretChildEmail: { type: String, required: true },
  year: { type: Number, required: true },
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
