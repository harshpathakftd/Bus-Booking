import Bus from "../models/Bus.js";

export const createBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    return res.status(201).json(bus);
  } catch (error) {
    return res.status(400).json({ message: "Invalid bus payload" });
  }
};

export const listBuses = async (req, res) => {
  const { source, destination, type } = req.query;
  const query = {};
  if (source) query.source = new RegExp(source, "i");
  if (destination) query.destination = new RegExp(destination, "i");
  if (type) query.type = type;

  const buses = await Bus.find(query).sort({ departureTime: 1 });
  return res.json(buses);
};

export const getBusById = async (req, res) => {
  const bus = await Bus.findById(req.params.id);
  if (!bus) return res.status(404).json({ message: "Bus not found" });
  return res.json(bus);
};
