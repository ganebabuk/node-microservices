const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get users list
 *     description: Fetch users list.
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       404:
 *         description: Users not found
 */
router.get("/", userController.getUsers);
/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     summary: Get user details with purchaed orders
 *     description: Retrieve orders based on the provided email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user whose orders are to be fetched
 *     responses:
 *       200:
 *         description: Successfully retrieved user details with orders
 *       404:
 *         description: Data not found
 */
router.get("/:email", userController.getUserDetails);
router.post("/login", userController.login);

module.exports = router;
