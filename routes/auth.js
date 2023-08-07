const express = require("express");
// const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Username already exists" });
		}

		// Hash the password before saving
		// const hashedPassword = await bcrypt.hash(password, 10);

		// const newUser = new User({ username, password: hashedPassword });
		const newUser = new User({ username, password });
		await newUser.save();

		res.status(201).json({ message: "Registration successful", user: newUser });
	} catch (error) {
		res.status(500).json({ message: "Registration failed", error: error.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ message: "Invalid username" });
		}

		// Compare the provided password with the hashed password in the database
		// const isPasswordValid = await bcrypt.compare(password, user.password);
		if (password !== user.password) {
			return res.status(401).json({ message: "Invalid password" });
		}

		res.json({ message: "Login successful", user });
	} catch (error) {
		res.status(500).json({ message: "Login failed", error: error.message });
	}
});

module.exports = router;
