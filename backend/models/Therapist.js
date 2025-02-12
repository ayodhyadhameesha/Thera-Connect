const mongoose = require("mongoose");

const TherapistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  bio: { type: String, required: true },
  availability: { type: [String], required: true }, // Array of available time slots
});

module.exports = mongoose.model("Therapist", TherapistSchema);
