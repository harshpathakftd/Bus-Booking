import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;
