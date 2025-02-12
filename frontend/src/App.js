import React from "react";
import TherapistList from "./components/TherapistList";
import { Navbar, Container } from "react-bootstrap";

function App() {
  return (
    <>
      {/* Header Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow">
        <Container>
          <Navbar.Brand href="#">
            <i className="bi bi-heart-pulse-fill"></i> TheraConnect
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4">
        <TherapistList />
      </Container>
    </>
  );
}

export default App;
