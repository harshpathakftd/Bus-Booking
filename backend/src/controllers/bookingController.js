import Booking from "../models/Booking.js";
import Bus from "../models/Bus.js";

export const createBooking = async (req, res) => {
  try {
    const { busId, seats, passengers } = req.body;
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const conflict = seats.some((seat) => bus.bookedSeats.includes(seat));
    if (conflict) return res.status(400).json({ message: "Some seats already booked" });

    bus.bookedSeats.push(...seats);
    await bus.save();

    const booking = await Booking.create({
      user: req.user.id,
      bus: bus._id,
      seats,
      passengers,
      amount: seats.length * bus.fare
    });

    return res.status(201).json(booking);
  } catch (error) {
    return res.status(400).json({ message: "Booking failed" });
  }
};

export const myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("bus")
    .sort({ createdAt: -1 });
  return res.json(bookings);
};

export const dashboardStats = async (_req, res) => {
  const totalBookings = await Booking.countDocuments();
  const revenueRows = await Booking.find({ status: "confirmed" });
  const totalRevenue = revenueRows.reduce((sum, b) => sum + b.amount, 0);
  const activeBuses = await Bus.countDocuments();

  return res.json({ totalBookings, totalRevenue, activeBuses });
};
