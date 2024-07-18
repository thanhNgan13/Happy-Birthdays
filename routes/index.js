const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views", "index.html"));
});

router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views", "home.html"));
});

module.exports = router;
