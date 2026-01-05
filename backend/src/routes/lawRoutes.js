const express = require("express");
const router = express.Router();
const { analyzeLaw } = require("../controllers/lawController");

router.post("/analyze", analyzeLaw);

module.exports = router;
