import MoneySupply from "../models/moneySupply.js";

export const getMoneySupply = async (req, res) => {
  try {
    const msupply = await MoneySupply.find({}, { _id: 0, date: 1, M1: 1, M2: 1, M3: 1 });

    // reformat M1 and M2 
    const modifiedMsupply = msupply.map((item) => {
      return {
        ...item,
        date: item.date,
        M1: item.M1 * 1000000000,
        M2: item.M2 * 1000000000,
        M3: item.M3,
      };
    });


    res.status(200).json(modifiedMsupply);
  } catch (error) {
    res.status(400).json({ error: message })
  };
};