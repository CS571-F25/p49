import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// Function that controls whats on the top nav bar. Links to important pages on this site such as Home, Explore, and Profile
export default function NavbarMain() {
  return (
    <Navbar expand="lg" className="shadow-sm cc-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span style={{ fontWeight: 700 }}>Campus Cravings</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/explore">
              Explore
            </Nav.Link>
            <Nav.Link as={Link} to="/mood">
              Mood Quiz
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}