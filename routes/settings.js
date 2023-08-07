const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/update", async (req, res) => {
	const { id, settings } = req.body;

	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		if (settings) {
			if (settings.privacy) {
				user.settings.privacy = settings.privacy;
			}

			if (settings.favorites) {
				user.settings.favorites = settings.favorites;
			}

			if (settings.permissions) {
				user.settings.permissions = settings.permissions;
			}
		}

		let updatedUser = await user.save();

		// Respond with a success message
		res.status(200).json({ message: "User settings updated successfully", user: updatedUser });
	} catch (error) {
		// If an error occurs, respond with an error message
		res.status(500).json({ message: "Error updating user settings" });
	}
});

module.exports = router;
