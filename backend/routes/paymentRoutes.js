const express = require("express");
const Stripe = require("stripe");
const Booking = require("../models/Booking");
require("dotenv").config();

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { bookingId, amount } = req.body;
    const booking = await Booking.findById(bookingId).populate("therapist");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Session with ${booking.therapist.name}` },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/payment-failed`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ message: "Error creating checkout session", error });
  }
});

module.exports = router;
