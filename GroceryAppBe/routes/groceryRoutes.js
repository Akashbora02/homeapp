import express from "express";
import Grocery from "../models/Grocery.js";

const router = express.Router();

// GET all groceries
router.get("/", async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD grocery
router.post("/", async (req, res) => {
  try {
    const grocery = new Grocery(req.body);
    await grocery.save();
    res.json(grocery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
