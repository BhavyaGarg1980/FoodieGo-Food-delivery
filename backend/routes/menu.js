const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const menuFile = path.join(__dirname, "../menu.json");

// GET menu by restaurant
router.get("/:restaurantId", (req, res) => {
  const data = fs.readFileSync(menuFile);
  const menu = JSON.parse(data);

  const restaurantMenu = menu.filter(
    item => item.restaurantId == req.params.restaurantId
  );
  res.json(restaurantMenu);
});

// ADD menu item
router.post("/", (req, res) => {
  const { restaurantId, name, price, image } = req.body;
  const data = fs.readFileSync(menuFile);
  let menu = JSON.parse(data);

  const newItem = {
    id: Date.now(),
    restaurantId,
    name,
    price,
    image
  };

  menu.push(newItem);
  fs.writeFileSync(menuFile, JSON.stringify(menu, null, 2));
  res.json({ message: "Menu item added", item: newItem });
});

module.exports = router;