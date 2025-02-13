const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
/**
 * @swagger
 * /api/orders/{email}:
 *   get:
 *     summary: Get orders by user email
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
 *         description: Successfully retrieved orders
 *       404:
 *         description: Orders not found
 */
router.get("/:email", orderController.getOrdersByEmail);

module.exports = router;
