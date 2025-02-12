require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(cors()); // Enable CORS

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Sample Route
app.get("/", (req, res) => {
  res.send("TheraConnect API is running...");
});

const therapistRoutes = require("./routes/therapistRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/therapists", therapistRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
