import React, { useEffect, useState } from "react";
import { getTherapists } from "../services/therapistService";
import { Card, Button, Container, Row, Col, Form, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMd, faCalendarAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FadeLoader } from "react-spinners";
import BookingForm from "./BookingForm";

const TherapistList = () => {
  const [therapists, setTherapists] = useState([]);
  const [searchSpecialty, setSearchSpecialty] = useState("");
  const [searchAvailability, setSearchAvailability] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapists = async () => {
      const data = await getTherapists();
      setTherapists(data);
      setLoading(false);
    };
    fetchTherapists();
  }, []);

  const filteredTherapists = therapists.filter((therapist) =>
    therapist.specialty.toLowerCase().includes(searchSpecialty.toLowerCase()) &&
    therapist.availability.some((slot) => slot.toLowerCase().includes(searchAvailability.toLowerCase()))
  );

  const handleBookSession = (therapist) => {
    setSelectedTherapist(therapist);
    setShowBookingForm(true);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🔍 Find a Therapist</h2>

      {/* Search Fields */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faUserMd} /></span>
            <Form.Control
              type="text"
              placeholder="Search by specialty..."
              value={searchSpecialty}
              onChange={(e) => setSearchSpecialty(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faCalendarAlt} /></span>
            <Form.Control
              type="text"
              placeholder="Search by availability (e.g., Monday 2PM)"
              value={searchAvailability}
              onChange={(e) => setSearchAvailability(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Loader Animation */}
      {loading && (
        <div className="text-center">
          <FadeLoader color="#007bff" />
          <p className="mt-3">Fetching top therapists for you...</p>
        </div>
      )}

      {/* Therapist Cards */}
      <Row>
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map((therapist, index) => (
            <Col md={4} key={therapist._id} className="mb-4">
              <Card className="therapist-card shadow-lg border-0">
                <Card.Img
                  variant="top"
                  src={`https://www.shutterstock.com/image-vector/illustration-cute-male-doctor-holding-600nw-2084985718.jpg`} // Placeholder images
                  className="therapist-img"
                />
                <Card.Body>
                  <Card.Title>{therapist.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <FontAwesomeIcon icon={faUserMd} /> {therapist.specialty}
                  </Card.Subtitle>
                  <Card.Text>{therapist.bio}</Card.Text>
                  <p>
                    <strong>Availability:</strong> {therapist.availability.map((slot, idx) => (
                      <Badge key={idx} bg="info" className="me-1">{slot}</Badge>
                    ))}
                  </p>
                  <Button variant="primary" onClick={() => handleBookSession(therapist)}>
                    📅 Book Session
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : !loading && (
          <Col>
            <p className="text-center">❌ No therapists found.</p>
          </Col>
        )}
      </Row>

      {/* Booking Form Modal */}
      {selectedTherapist && (
        <BookingForm
          show={showBookingForm}
          handleClose={() => setShowBookingForm(false)}
          therapist={selectedTherapist}
        />
      )}
    </Container>
  );
};

export default TherapistList;
