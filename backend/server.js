const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
"mongodb+srv://username:password@clustername.mydbtl7.mongodb.net/foodDelivery?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/restaurants", require("./routes/restaurants"));
app.use("/api/menu", require("./routes/menu"));
app.use("/api/orders", require("./routes/orders"));

app.use(express.static(path.join(__dirname, "../frontend")));

app.listen(5000, () => console.log("Server running on port 5000"));
