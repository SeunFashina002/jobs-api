const express = require("express");
const { register, login } = require("../controllers/auth");

const router = express.Router();

router.post("/", register);
router.post("/", login);

module.exports = router;
