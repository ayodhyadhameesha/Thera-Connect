const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist", required: true },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  date: { type: String, required: true },  // Example: "Monday 2PM"
  status: { type: String, default: "Confirmed" }, // Status: Confirmed, Cancelled, Completed
  videoLink: { type: String, required: true } // Jitsi Meet video session link
});

module.exports = mongoose.model("Booking", BookingSchema);
