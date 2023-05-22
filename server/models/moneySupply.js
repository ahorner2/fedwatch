import mongoose from "mongoose";

const MoneySupplySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    M1: {
      type: Number,
      required: true,
    },
    M2: {
      type: Number,
      required: true,
    },
    M3: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const MoneySupply = mongoose.model("MoneySupply", MoneySupplySchema);
export default MoneySupply;
