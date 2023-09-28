const express = require("express");
const { createJob, getAllJobs } = require("../controllers/jobs");

const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);

// router.get("/", getJobs)
// router.get("/:id", getJob)

module.exports = router;
