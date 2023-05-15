import FedBalance from '../models/fedBalance.js';

export const getBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const balance = await FedBalance.findById(id);
    res.status(200).json(balance);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getList = async (req, res) =>  {
  try {
    const all = await FedBalance.find();

    res.status(200).json(all);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

export const getFed = async (req, res) => {
  try {
    const federal = await FedBalance.find({}, { date: 1, fed: 1 });
     
    res.status(200).json(federal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  };
};

export const getNet = async (req, res) => {
  try {
    const net = await FedBalance.find({}, { _id: 0, date: 1, net_liquidity: 1 });
     
    res.status(200).json(net);
  } catch (error) {
    res.status(400).json({ message: error.message });
  };
};

export const getBreakdown = async (req, res) => {
  try{
    const breakdown = await FedBalance.find({}, { date: 1, fed: 1, tga: 1, rrp: 1, net_liquidity: 1 });
    const lastBreakdown = breakdown.slice(-1)[0];

    res.status(200).json(lastBreakdown);
  } catch (error) {
    res.status(400).json({ message: error.message });
  };
};

export const getMonthly = async (req, res) => {
  try{
    const monthly = await FedBalance.find({}, { date: 1, fed: 1, tga: 1, rrp: 1, net_liquidity: 1 });

    res.status(200).json(monthly);
  } catch (error) {
    res.status(400).json({ message: error.message });
  };
};

export const getDashboardStats = async (req, res) => {
  try {
    // const today = new Date();
    // hardcoded start
    const firstDateInData = new Date("2022-05-03T05:00:00.000+00:00");

    // full dataset
    const allData = await FedBalance.find().sort({ date: -1 });
    // last 50 rows descending
    const table = await FedBalance.find({}, { date: 1, fed: 1, tga: 1, rrp: 1,  net_liquidity: 1, net_change_net_liquidity: 1 }).limit(50).sort({ date: -1 });

    // granular time views
    const thirtyDaysData = await FedBalance.find().limit(30).sort({ date: -1 });
    const dailyData = thirtyDaysData.slice(1)[0];

    const yesterdayData = thirtyDaysData.slice(2)[0];
    const yesterdayNet = yesterdayData.net_liquidity;

    // fed daily, monthly, and total data
    const netMonthly = dailyData.net_liquidity;
    const netThirtyDaysAgo = thirtyDaysData[29].net_liquidity;
    const netPctChangeMonthly =
      (((netMonthly - netThirtyDaysAgo) / netThirtyDaysAgo) * 100).toFixed(2) + "%";

    const todayNet = dailyData.net_liquidity;
    const weekAgoNet = thirtyDaysData[6].net_liquidity;
    const netPctChangeWeekly =
      (((todayNet - weekAgoNet) / weekAgoNet) * 100).toFixed(2) + "%";

    // fed daily, monthly, and total data
    const currentNet = dailyData.net_liquidity;
    const netYearly = allData[allData.length - 1].net_liquidity;
    const netPctChangeTotal = 
      (((currentNet - netYearly) / netYearly) * 100).toFixed(2) + "%";

    const netPctChangeDaily = (((currentNet - yesterdayNet) / yesterdayNet) * 100).toFixed(2) + "%"

    const dailyNet = dailyData.net_liquidity.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: "compact"
    });

    res.status(200).json({
      table,
      allData,
      dailyData,
      yesterdayData,
      dailyNet,
      thirtyDaysData,
      netPctChangeDaily,
      netPctChangeTotal,
      netPctChangeMonthly,
      netPctChangeWeekly,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};
