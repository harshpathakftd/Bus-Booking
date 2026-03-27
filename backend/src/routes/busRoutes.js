import { Router } from "express";
import { createBus, getBusById, listBuses } from "../controllers/busController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = Router();
router.get("/", listBuses);
router.get("/:id", getBusById);
router.post("/", protect, adminOnly, createBus);

export default router;
