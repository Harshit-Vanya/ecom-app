import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaMobileAlt, 
  FaTshirt, 
  FaHome, 
  FaLaptop,
  FaHeadphones,
  FaBook,
  FaGamepad,
  FaGift
} from 'react-icons/fa';
import '../styles/Categories.css';

const categories = [
  { name: 'Mobile', icon: FaMobileAlt },
  { name: 'Fashion', icon: FaTshirt },
  { name: 'Home', icon: FaHome },
  { name: 'Electronics', icon: FaLaptop },
  { name: 'Audio', icon: FaHeadphones },
  { name: 'Books', icon: FaBook },
  { name: 'Gaming', icon: FaGamepad },
  { name: 'Deals', icon: FaGift },
];

const Categories = () => {
  return (
    <div className="categories-section">
      <Container>
        <Row className="justify-content-center">
          {categories.map((category, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={3} className="mb-4">
              <div className="category-card">
                <category.icon size={30} className="category-icon" />
                <h6 className="category-name">{category.name}</h6>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Categories; 