const express = require("express");
const { createJob, getAllJobs, getJob } = require("../controllers/jobs");

const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob);

// router.get("/", getJobs)
// router.get("/:id", getJob)

module.exports = router;
