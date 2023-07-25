const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if the username already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Username already exists" });
		}

		// Hash the password before saving it to the database
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user in the database
		const newUser = new User({ username, password: hashedPassword });
		await newUser.save();

		res.status(201).json({ message: "Registration successful" });
	} catch (error) {
		res.status(500).json({ message: "Registration failed", error: error.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Find the user in the database
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ message: "Invalid username or password" });
		}

		// Compare the password with the hashed password in the database
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid username or password" });
		}

		res.json({ message: "Login successful", user: user.username });
	} catch (error) {
		res.status(500).json({ message: "Login failed", error: error.message });
	}
});

module.exports = router;
