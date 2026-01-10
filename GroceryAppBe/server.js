import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import groceryRoutes from "./routes/groceryRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected (Grocery)"))
  .catch((err) => console.error("Mongo error:", err));

app.use("/api/groceries", groceryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Grocery backend running on port ${PORT}`);
});
