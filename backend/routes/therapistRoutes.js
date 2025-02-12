const express = require("express");
const Therapist = require("../models/Therapist");
const router = express.Router();

// Get all therapists
router.get("/", async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.json(therapists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching therapists", error });
  }
});

module.exports = router;
