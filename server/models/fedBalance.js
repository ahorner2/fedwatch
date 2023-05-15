import mongoose from 'mongoose';


const FedBalanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    fed: {
      type: Number,
    },
    net_change_fed: {
      type: Number,
    },
    rrp: {
      type: Number,
    },
    net_change_rrp: {
      type: Number,
    },
    tga: {
      type: Number,
    },
    net_change_tga: {
      type: Number,
    },
    net_liquidity: {
      type: Number,
    },
    net_change_net_liquidity: {
      type: Number,
    },
    spx: {
      type: Number,
    },
  },
  { timestamps: true },
);

const FedBalance = mongoose.model("FedBalance", FedBalanceSchema);
export default FedBalance;