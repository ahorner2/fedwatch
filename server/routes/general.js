import express from 'express';
import { getBalance, getList, getBreakdown, getNet, getMonthly, getDashboardStats } from '../controllers/general.js';

const router = express.Router();

router.get("/balance/:id", getBalance)
router.get("/dashboard", getDashboardStats)
router.get("/list", getList);
router.get("/net", getNet);
router.get("/daily", getList);
router.get("/breakdown", getBreakdown);
router.get("/monthly", getMonthly);

export default router;