//  require dependencies
const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const { viewUsers } = require("../controllers/user.controller");

//  creating a route
router.get("/", authenticate, viewUsers);

//    exporting modules
module.exports = router;
