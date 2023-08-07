const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	amenities: {
		type: [String],
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
