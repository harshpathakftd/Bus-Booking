import { Router } from "express";
import {
  createBooking,
  dashboardStats,
  myBookings
} from "../controllers/bookingController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = Router();
router.post("/", protect, createBooking);
router.get("/mine", protect, myBookings);
router.get("/dashboard", protect, adminOnly, dashboardStats);

export default router;
