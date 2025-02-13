const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { consumeUserRequests } = require("../../rabbitmq/consumeUserRequests");
const { consumeRenewedTokens } = require("../kafka/tokenConsumer");

const JWT_SECRET = process.env.JWT_SECRET;

// Start Kafka consumer in a separate module
async function startTokenListener() {
  await consumeRenewedTokens();
}

startTokenListener();

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user details and fetch orders via RabbitMQ
exports.getUserDetails = async (req, res) => {
  try {
    console.log("Incoming request params:", req.params); // Debugging

    const { email } = req.params;
    
    if (!email) {
      console.error("Error: Email is undefined in req.params");
      return res.status(400).json({ message: "Email parameter is missing" });
    }

    console.log(`Fetching user with email: ${email}`);
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Call Order Service via RabbitMQ
    console.log(`Calling consumeUserRequests with email: ${email}`);
    const orders = await consumeUserRequests(email);
    
    console.log("Received orders:", orders);
    res.json({ user, orders });
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ message: "Error fetching user details" });
  }
};


// Generate JWT Token
exports.login = (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};
