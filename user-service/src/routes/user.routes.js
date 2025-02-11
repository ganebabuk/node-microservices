const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.get("/:email", userController.getUserDetails);
router.post("/login", userController.login);
// router.get("/api/users/:email", userController.getUserDetails);

module.exports = router;
