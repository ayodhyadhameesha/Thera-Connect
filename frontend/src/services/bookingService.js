import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(API_URL, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    return { error: "Failed to create booking" };
  }
};
