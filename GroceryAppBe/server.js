// GroceryAppBe/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import groceryRoutes from "./routes/groceryRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/groceries", groceryRoutes);

// Fixed port from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Grocery backend running on port ${PORT}`);
});
