const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Hotel = require("../models/hotel");

router.post("/insertData", async (req, res) => {
	try {
		const hotelsData = fs.readFileSync(path.join(__dirname, "../data/hotels.json"));
		const hotels = JSON.parse(hotelsData).hotels;

		// Insert each hotel into the database
		for (const hotel of hotels) {
			const newHotel = new Hotel({
				name: hotel.name,
				location: hotel.location,
				rating: hotel.rating,
				price: hotel.price,
				amenities: hotel.amenities,
				image: hotel.image,
			});

			await newHotel.save();
		}

		res.status(201).json({ message: "Hotels data inserted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error inserting hotels data", error: error.message });
	}
});

// Create a new hotel
router.post("/", async (req, res) => {
	try {
		const hotel = new Hotel(req.body);
		await hotel.save();
		res.status(201).json({ message: "Hotel created successfully", hotel });
	} catch (error) {
		res.status(500).json({ message: "Failed to create hotel", error: error.message });
	}
});

// Get all hotels
router.get("/", async (req, res) => {
	console.log("get all hotels");
	try {
		const hotels = await Hotel.find();
		res.json(hotels);
	} catch (error) {
		res.status(500).json({ message: "Failed to get hotels", error: error.message });
	}
});

// Get all hotels with keyword search
router.get("/search", async (req, res) => {
	try {
		const keyword = req.query.keyword;
		let query = {};

		if (keyword) {
			const regex = new RegExp(keyword, "i");
			query = {
				$or: [{ name: regex }, { address: regex }, { city: regex }, { country: regex }, { amenities: regex }],
			};
		}

		const hotels = await Hotel.find(query);
		res.json(hotels);
	} catch (error) {
		res.status(500).json({ message: "Failed to get hotels", error: error.message });
	}
});

// Get a specific hotel by ID
router.get("/:id", async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		if (!hotel) {
			return res.status(404).json({ message: "Hotel not found" });
		}
		res.json(hotel);
	} catch (error) {
		res.status(500).json({ message: "Failed to get hotel", error: error.message });
	}
});

// Update a hotel by ID
router.put("/:id", async (req, res) => {
	try {
		const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!hotel) {
			return res.status(404).json({ message: "Hotel not found" });
		}
		res.json({ message: "Hotel updated successfully", hotel });
	} catch (error) {
		res.status(500).json({ message: "Failed to update hotel", error: error.message });
	}
});

// Delete a hotel by ID
router.delete("/:id", async (req, res) => {
	try {
		const hotel = await Hotel.findByIdAndRemove(req.params.id);
		if (!hotel) {
			return res.status(404).json({ message: "Hotel not found" });
		}
		res.json({ message: "Hotel deleted successfully", hotel });
	} catch (error) {
		res.status(500).json({ message: "Failed to delete hotel", error: error.message });
	}
});

module.exports = router;
