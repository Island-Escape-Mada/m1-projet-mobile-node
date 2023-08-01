// require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cookieSession = require("cookie-session");
const dbConfig = require("./configs/db.config");

// routes
const authRoutes = require("./routes/auth");
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cookieSession({
	  name: "mean-session",
	  secret: "@meansecret-token!",
	  httpOnly: true
	})
  );
  
  app.all("/*", function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
  });

const mongoString = process.env.DATABASE_URL || dbConfig.CONNECTION;
const db = require("./models");
db.mongoose
  .connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to mongo DB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 4000; 
app.listen(port, () => {
	console.log(`Server Started at ${port}`);
});
