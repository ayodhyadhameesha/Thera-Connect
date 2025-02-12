const express = require("express");
const Booking = require("../models/Booking");
const Therapist = require("../models/Therapist");

const router = express.Router();

// Generate a Jitsi Meet session link
const generateJitsiLink = (therapistId, clientEmail) => {
  return `https://meet.jit.si/TheraConnect-${therapistId}-${clientEmail.replace(/[@.]/g, "-")}`;
};

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const { therapistId, clientName, clientEmail, date } = req.body;

    // Check if the therapist exists
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    // Generate Jitsi video link
    const videoLink = generateJitsiLink(therapistId, clientEmail);

    // Create the booking
    const booking = new Booking({ therapist: therapistId, clientName, clientEmail, date, videoLink });
    await booking.save();

    res.status(201).json({ message: "Booking confirmed", booking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("therapist", "name specialty");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});

// Get a specific booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("therapist", "name specialty");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error });
  }
});

module.exports = router;
