const express = require("express");
const { createJob, getJobs} = require("../controllers/jobs");

const router = express.Router();

//Todo
router.post("/", createJob);
router.get("/", getJobs)
router.get("/:id", getJob)


module.exports = router;
