//  require dependencies
const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const { createUser, login, logout } = require("../controllers/auth.controller");

//  creating a route
router.post("/", createUser);
router.post("/login", login);
router.get("/logout", authenticate, logout);

//    exporting modules
module.exports = router;
