

require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Log the Mongo URI to confirm it's being loaded correctly
console.log("Mongo URI: ", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a Mongoose Schema and Model for Grocery Items
const grocerySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Grocery = mongoose.model("Grocery", grocerySchema);

// API Endpoints

// GET all grocery items
app.get("/api/groceries", async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new grocery item
app.post("/api/groceries", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }
    const grocery = new Grocery({ name });
    await grocery.save();
    res.status(201).json(grocery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a grocery item by id
app.delete("/api/groceries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Grocery.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server with automatic port switching
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle EADDRINUSE error and switch to the next available port
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    const newPort = port + 1;
    console.log(`Port ${port} is in use, trying port ${newPort}...`);
    app.listen(newPort, () => console.log(`Server is now running on port ${newPort}`));
  } else {
    console.error(err);
  }
});




/*const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://13.126.27.181:27017/grocerydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Define a Mongoose Schema and Model for Grocery Items
const grocerySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Grocery = mongoose.model("Grocery", grocerySchema);

// API Endpoints

// GET all grocery items
app.get("/api/groceries", async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new grocery item
app.post("/api/groceries", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }
    const grocery = new Grocery({ name });
    await grocery.save();
    res.status(201).json(grocery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a grocery item by id
app.delete("/api/groceries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Grocery.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

*/