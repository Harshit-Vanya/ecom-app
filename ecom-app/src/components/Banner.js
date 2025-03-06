import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/Banner.css';

const Banner = () => {
  return (
    <Carousel className="main-banner">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=400&fit=crop"
          alt="Electronics"
        />
        <Carousel.Caption>
          <h3>Latest Electronics</h3>
          <p>Discover amazing deals on the newest gadgets</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop"
          alt="Fashion"
        />
        <Carousel.Caption>
          <h3>Fashion Trends</h3>
          <p>Explore the latest fashion collections</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&h=400&fit=crop"
          alt="Home & Living"
        />
        <Carousel.Caption>
          <h3>Home & Living</h3>
          <p>Transform your living space</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner; 