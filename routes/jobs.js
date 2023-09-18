const express = require("express");
const { createJob } = require("../controllers/jobs");

const router = express.Router();

router.post("/", createJob);

module.exports = router;
