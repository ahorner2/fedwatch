import express from "express";
import { getMoneySupply } from "../controllers/money.js";

const router = express.Router();

router.get("/msupply", getMoneySupply);

export default router;