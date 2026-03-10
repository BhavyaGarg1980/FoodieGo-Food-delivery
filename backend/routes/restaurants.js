const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const restaurantsFile = path.join(__dirname, "../restaurants.json");

router.post("/", (req, res) => {

  const { name, description, image } = req.body;

  let restaurants = [];

  // read existing data
  if (fs.existsSync(restaurantsFile)) {
    const data = fs.readFileSync(restaurantsFile);
    restaurants = JSON.parse(data);
  }

  const newRestaurant = {
    id: Date.now(),
    name,
    description,
    image
  };

  restaurants.push(newRestaurant);

  fs.writeFileSync(restaurantsFile, JSON.stringify(restaurants, null, 2));

  res.json({ message: "Restaurant added" });

});

module.exports = router;