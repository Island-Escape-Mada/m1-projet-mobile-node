require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoString = process.env.DATABASE_URL;

const authRoutes = require("./routes/auth");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
	console.log(error);
});

database.once("connected", () => {
	console.log("Database Connected");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use(express.json());

app.listen(3000, () => {
	console.log(`Server Started at ${3000}`);
});
