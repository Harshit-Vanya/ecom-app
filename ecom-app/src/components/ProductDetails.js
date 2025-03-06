import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaBolt, FaMapMarkerAlt, FaLock } from 'react-icons/fa';
import '../styles/ProductDetails.css';

// Import sample products data
const sampleProducts = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    price: 999.99,
    description: "Apple's latest iPhone with pro camera system",
    longDescription: `Experience the next level of iPhone. Featuring the most advanced pro camera system ever on iPhone, Super Retina XDR display with ProMotion, lightning-fast A15 Bionic chip, exceptional durability, and so much more.

• 6.1-inch Super Retina XDR display with ProMotion
• Pro camera system with new 12MP Telephoto, Wide, and Ultra Wide cameras
• A15 Bionic chip for lightning-fast performance
• Up to 28 hours of video playback
• 5G capable for superfast downloads and high-quality streaming`,
    images: [
      "https://images.unsplash.com/photo-1632661674596-618d8b64d641?w=400",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?w=400",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400"
    ],
    rating: 4.5,
    stock: 10,
    seller: "Apple Store",
    warranty: "1 Year Manufacturer Warranty",
    specifications: {
      "Display": "6.1-inch Super Retina XDR",
      "Processor": "A15 Bionic chip",
      "Camera": "12MP Pro camera system",
      "Battery": "Up to 28 hours video playback",
      "Storage": "128GB, 256GB, 512GB, 1TB",
      "OS": "iOS 15"
    }
  },
  {
    id: 2,
    name: "MacBook Air M1",
    price: 1299.99,
    description: "Powerful laptop with Apple's M1 chip",
    longDescription: `The MacBook Air with M1 is a revolution in computing. Experience incredible performance, amazing battery life, and stunning design in the world's thinnest and lightest notebook.

• Apple M1 chip with 8‑core CPU and 7‑core GPU
• 13.3-inch Retina display with True Tone
• Up to 18 hours of battery life
• Silent, fanless design
• Touch ID for secure authentication`,
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400"
    ],
    rating: 4.8,
    stock: 5,
    seller: "Apple Store",
    warranty: "1 Year Manufacturer Warranty",
    specifications: {
      "Processor": "Apple M1 chip",
      "Display": "13.3-inch Retina",
      "Memory": "8GB unified memory",
      "Storage": "256GB SSD",
      "Battery": "Up to 18 hours",
      "Weight": "2.8 pounds"
    }
  },
  {
    id: 3,
    name: "Sony WH-1000XM4",
    price: 349.99,
    description: "Premium noise-cancelling headphones",
    longDescription: `Industry-leading noise cancellation with Dual Noise Sensor microphones. Experience exceptional sound quality with Edge-AI, co-developed with Sony Music Studios Tokyo.

• Industry-leading noise cancellation
• Multipoint connection for simultaneous pairing
• Up to 30-hour battery life
• Touch Sensor controls
• Speak-to-chat technology`,
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400"
    ],
    rating: 4.7,
    stock: 15,
    seller: "Sony Electronics",
    warranty: "1 Year Manufacturer Warranty",
    specifications: {
      "Type": "Over-ear headphones",
      "Battery Life": "Up to 30 hours",
      "Noise Cancellation": "Active",
      "Bluetooth": "Version 5.0",
      "Weight": "254g",
      "Charging": "USB-C"
    }
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Find the product from sample data based on ID
    const productData = sampleProducts.find(p => p.id === parseInt(id)) || sampleProducts[0];
    setProduct({
      ...productData,
      reviews: [
        {
          id: 1,
          user: "John D.",
          rating: 5,
          date: "2024-02-15",
          comment: `Excellent ${productData.name}! The quality is outstanding.`
        },
        {
          id: 2,
          user: "Sarah M.",
          rating: 4,
          date: "2024-02-10",
          comment: `Great ${productData.name} but could be better in some aspects.`
        }
      ]
    });
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)));
  };

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', { product, quantity });
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log('Buying now:', { product, quantity });
  };

  if (!product) {
    return (
      <Container className="mt-5 text-center">
        <div className="loading-spinner">
          <h2>Loading product details...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="product-details-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> › <Link to="/electronics">Electronics</Link> › {product.name}
      </div>

      {/* Product Title Section */}
      <div className="product-header">
        <h1 className="product-title">{product.name}</h1>
        <Link to={`/store/${product.seller}`} className="brand-link">Visit the {product.seller} Store</Link>
        
        <div className="product-rating">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={index < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
            />
          ))}
          <span className="rating-text">
            {product.rating} ({product.reviews.length} ratings)
          </span>
        </div>
      </div>

      {/* Main Product Section */}
      <Row className="product-main-section">
        {/* Product Images */}
        <Col lg={5}>
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </Col>

        {/* Buy Box */}
        <Col lg={3}>
          <div className="buy-box">
            <div className="price-section">
              <span className="price-symbol">₹</span>
              <span className="price-whole">{Math.floor(product.price)}</span>
              <span className="price-fraction">{(product.price % 1).toFixed(2).substring(2)}</span>
              <div className="tax-info">Inclusive of all taxes</div>
            </div>

            <div className="fulfilled-badge">Fulfilled</div>

            <div className="delivery-info">
              <span className="delivery-date">FREE delivery</span>
              <br />
              <strong>Monday, March 10</strong>
              <br />
              <FaMapMarkerAlt /> <Link className="location-link">Select delivery location</Link>
            </div>

            <div className="stock-info">
              In stock
            </div>

            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            <div className="secure-transaction">
              <FaLock /> Secure transaction
            </div>

            <div className="seller-info">
              <p>Sold by {product.seller}</p>
              <p>{product.warranty}</p>
            </div>
          </div>
        </Col>

        {/* Product Features */}
        <Col lg={4}>
          <div className="about-item">
            <h2>About this item</h2>
            <ul className="feature-list">
              {product.longDescription.split('\n').filter(line => line.trim()).map((line, index) => (
                <li key={index} className="feature-item">{line.trim()}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>

      {/* Product Details Section */}
      <Row className="product-details-section">
        <Col>
          <div className="details-tabs">
            <h2>Product Details</h2>
            <div className="specifications">
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-key">{key}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="reviews-section">
        <Col>
          <div className="customer-reviews">
            <h2>Customer Reviews</h2>
            <div className="overall-rating">
              <div className="rating-summary">
                <div className="average-rating">{product.rating}</div>
                <div className="rating-stars">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={index < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
                <div className="total-ratings">{product.reviews.length} ratings</div>
              </div>
            </div>
            <div className="reviews-list">
              {product.reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">{review.user}</span>
                    <div className="review-rating">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={index < review.rating ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-content">
                    {review.comment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* Related Products Section */}
      <Row className="related-products-section">
        <Col>
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="products-grid">
              {sampleProducts
                .filter(p => p.id !== product.id)
                .map(relatedProduct => (
                  <div key={relatedProduct.id} className="related-product-card">
                    <Link to={`/product/${relatedProduct.id}`}>
                      <img src={relatedProduct.images[0]} alt={relatedProduct.name} />
                      <div className="product-info">
                        <h3>{relatedProduct.name}</h3>
                        <div className="product-rating">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              className={index < Math.floor(relatedProduct.rating) ? 'star-filled' : 'star-empty'}
                            />
                          ))}
                          <span>({relatedProduct.rating})</span>
                        </div>
                        <div className="product-price">
                          <span className="price-symbol">₹</span>
                          <span className="price-whole">{Math.floor(relatedProduct.price)}</span>
                          <span className="price-fraction">{(relatedProduct.price % 1).toFixed(2).substring(2)}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails; 