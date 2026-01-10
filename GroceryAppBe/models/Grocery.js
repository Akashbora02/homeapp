import mongoose from "mongoose";

const grocerySchema = new mongoose.Schema({
  name: String,
  quantity: Number
});

export default mongoose.model("Grocery", grocerySchema);
