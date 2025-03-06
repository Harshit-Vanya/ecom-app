import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import "../styles.css";
import { FaMapMarkerAlt, FaHome } from "react-icons/fa";

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <h1><strong>SmartChase</strong><span style={{ fontSize: "0.6em" }}>.com</span></h1>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/" className="home-link">
              <h5><FaHome size="35px" style={{ marginRight: "6px" }} />Home</h5>
            </Nav.Link>
            <Nav.Link href="#" className="location-picker">
              <FaMapMarkerAlt style={{ marginRight: "5px" }} />
              <span>Delivering to Bhopal 462044</span>
              <br />
              <strong><h5>Update Location</h5></strong>
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Select className="me-2">
              <option>All</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Kitchen</option>
            </Form.Select>
            <Form.Control className="search-bar"
              type="search"
              placeholder="Search SmartChase"
              aria-label="Search"
            />
            <Button className="navbar-button">Search</Button>
          </Form>
          
          <NavDropdown
            title={<span className="account-text">Hello, Harshit <br /><strong>Account & Lists</strong></span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to="/order-tracking">Track Orders</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Wishlist</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Sign Out</NavDropdown.Item>
          </NavDropdown>

          <Link to="/order-tracking" className="account-cart">Returns <br /><strong>& Orders</strong></Link>
          <a href="#" className="cart-icon">🛒</a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
