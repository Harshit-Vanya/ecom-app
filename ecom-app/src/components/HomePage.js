import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import Categories from './Categories';
import '../styles/HomePage.css';

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    price: 999.99,
    description: "Apple's latest iPhone with pro camera system",
    image_url: "https://images.unsplash.com/photo-1632661674596-618d8b64d641?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "MacBook Air M1",
    price: 1299.99,
    description: "Powerful laptop with Apple's M1 chip",
    image_url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Sony WH-1000XM4",
    price: 349.99,
    description: "Premium noise-cancelling headphones",
    image_url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Samsung QLED 4K TV",
    price: 1499.99,
    description: "65-inch Smart TV with quantum dot technology",
    image_url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    name: "iPad Pro 12.9",
    price: 1099.99,
    description: "Powerful tablet with M1 chip and Liquid Retina XDR display",
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    name: "Nintendo Switch OLED",
    price: 349.99,
    description: "Latest gaming console with enhanced display",
    image_url: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop"
  },
  {
    id: 7,
    name: "DJI Mini 2 Drone",
    price: 449.99,
    description: "Lightweight drone with 4K camera",
    image_url: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop"
  },
  {
    id: 8,
    name: "Samsung Galaxy Watch 4",
    price: 249.99,
    description: "Advanced smartwatch with health monitoring",
    image_url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop"
  }
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query = '') => {
    try {
      setLoading(true);
      // Simulate API call with setTimeout
      setTimeout(() => {
        if (query) {
          const filteredProducts = sampleProducts.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
          );
          setProducts(filteredProducts);
        } else {
          setProducts(sampleProducts);
        }
        setError(null);
        setLoading(false);
      }, 1000); // Simulate network delay
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Banner />
        <Categories />
        <Container className="mt-5 text-center">
          <div className="loading-spinner">
            <h2>Loading amazing products...</h2>
            <p>Please wait while we fetch the best deals for you!</p>
          </div>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Banner />
        <Categories />
        <Container className="mt-5 text-center">
          <h2 className="text-danger">{error}</h2>
        </Container>
      </>
    );
  }

  return (
    <>
      <Banner />
      <Categories />
      <Container className="my-5">
        <h2 className="section-title mb-4">Featured Products</h2>
        <Row xs={1} md={3} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Link to={`/product/${product.id}`} className="product-card-link">
                <Card className="h-100 shadow-sm product-card">
                  <div className="product-image-container">
                    <Card.Img
                      variant="top"
                      src={product.image_url}
                      className="product-image"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="product-title">{product.name}</Card.Title>
                    <Card.Text className="text-muted mb-2 product-description">
                      {product.description}
                    </Card.Text>
                    <Card.Text className="product-price">
                      ₹{product.price.toFixed(2)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {products.length === 0 && (
          <div className="text-center mt-5">
            <h3>No products found</h3>
          </div>
        )}
      </Container>
    </>
  );
};

export default HomePage; 