const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	settings: {
		privacy: {
			type: Object,
			default: {},
		},
		favorites: {
			type: Object,
			default: {},
		},
		permissions: {
			camera: { type: Boolean, default: false },
			location: { type: Boolean, default: false },
			internet: { type: Boolean, default: false },
		},
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
