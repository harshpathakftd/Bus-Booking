import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    fare: { type: Number, required: true },
    type: { type: String, enum: ["AC", "Non-AC"], default: "AC" },
    totalSeats: { type: Number, default: 40 },
    bookedSeats: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Bus", busSchema);
