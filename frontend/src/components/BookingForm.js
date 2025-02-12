import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { createBooking } from "../services/bookingService";
import { createCheckoutSession } from "../services/paymentService";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_YourPublicKeyHere");

const BookingForm = ({ show, handleClose, therapist }) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [videoLink, setVideoLink] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      therapistId: therapist._id,
      clientName,
      clientEmail,
      date: selectedDate,
    };

    const response = await createBooking(bookingData);
    
    if (response.error) {
      toast.error("Booking failed. Try again.");
    } else {
      setBookingId(response.booking._id);
      toast.success("Booking created! Please proceed to payment.");
    }

    setLoading(false);
  };

  const handlePayment = async () => {
    const amount = 50; // Set session price (e.g., $50)
    const sessionData = await createCheckoutSession(bookingId, amount);
    const stripe = await stripePromise;

    if (sessionData.id) {
      await stripe.redirectToCheckout({ sessionId: sessionData.id });
    } else {
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book a Session with {therapist.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bookingId ? (
          <div className="text-center">
            <p><strong>Booking Created!</strong></p>
            <Button variant="success" size="lg" onClick={handlePayment}>
              Pay Now ($50)
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control type="email" required value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select a Time Slot</Form.Label>
              <Form.Select required onChange={(e) => setSelectedDate(e.target.value)}>
                <option value="">Select...</option>
                {therapist.availability.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Confirm Booking"}
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookingForm;
