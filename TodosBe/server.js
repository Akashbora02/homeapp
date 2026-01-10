import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import groceryRoutes from "./routes/groceryRoutes.js"; // or todoRoutes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.use("/todos", todoRoutes); 
// OR app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
