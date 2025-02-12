require("dotenv").config();
const mongoose = require("mongoose");
const Therapist = require("../models/Therapist");

const mockTherapists = [
  {
    name: "Dr. Alice Smith",
    specialty: "Anxiety",
    bio: "Dr. Smith has 10 years of experience helping clients manage anxiety and stress.",
    availability: ["Monday 2PM", "Wednesday 5PM"],
  },
  {
    name: "Dr. John Doe",
    specialty: "Depression",
    bio: "Dr. Doe specializes in cognitive therapy for depression and self-esteem issues.",
    availability: ["Tuesday 3PM", "Thursday 4PM"],
  },
  {
    name: "Dr. Emily Johnson",
    specialty: "Trauma",
    bio: "Dr. Johnson helps clients recover from past trauma using a holistic approach.",
    availability: ["Friday 1PM", "Sunday 3PM"],
  },
  {
    name: "Dr. Michael Brown",
    specialty: "Relationships",
    bio: "Dr. Brown works with couples and individuals to improve relationship dynamics.",
    availability: ["Monday 5PM", "Thursday 2PM"],
  }
];

const saveMockTherapists = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Connected...");

    // Insert mock data into the database
    await Therapist.insertMany(mockTherapists);
    console.log("Mock therapists saved successfully!");

    // Close the DB connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error saving therapists:", error);
  }
};

// Run the script
saveMockTherapists();
