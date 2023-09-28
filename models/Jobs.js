const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide a company name"],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, "Please provide a position"],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ["interview", "declined", "pending"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: [true, "This field cannot be left empty"],
    ref: "User",
  },
});

module.exports = mongoose.model("Job", jobSchema);
