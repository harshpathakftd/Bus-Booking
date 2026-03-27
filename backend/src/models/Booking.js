import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    gender: String
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    seats: [{ type: String, required: true }],
    passengers: [passengerSchema],
    amount: { type: Number, required: true },
    status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
