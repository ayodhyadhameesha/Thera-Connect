import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

export const createCheckoutSession = async (bookingId, amount) => {
  try {
    const response = await axios.post(`${API_URL}/create-checkout-session`, {
      bookingId,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return { error: "Failed to create payment session" };
  }
};
