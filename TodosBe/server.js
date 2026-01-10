import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Todos backend running on port ${PORT}`)
);
