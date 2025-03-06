import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 13 Pro",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1632661674596-618d8b64d641?w=400",
      quantity: 1,
      stock: 10
    },
    {
      id: 2,
      name: "MacBook Air M1",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400",
      quantity: 2,
      stock: 5
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity >= 1 && newQuantity <= item.stock) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  if (cartItems.length === 0) {
    return (
      <Container className="cart-container my-5 text-center">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/">
            <Button variant="warning" className="continue-shopping-btn">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="cart-container my-5">
      <h1 className="cart-title mb-4">Shopping Cart</h1>
      
      <Row>
        <Col md={8}>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <Link to={`/product/${item.id}`} className="item-name">
                    {item.name}
                  </Link>
                  <p className="item-price">₹{item.price.toFixed(2)}</p>
                  <p className="stock-status">In Stock ({item.stock} available)</p>
                  
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <Button 
                        variant="light"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </Button>
                      <Form.Control
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val >= 1 && val <= item.stock) {
                            updateQuantity(item.id, val - item.quantity);
                          }
                        }}
                      />
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                    <Button
                      variant="link"
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <FaTrash /> Remove
                    </Button>
                  </div>
                </div>
                <div className="item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </Col>
        
        <Col md={4}>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Subtotal ({cartItems.length} items):</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Tax (18%):</span>
              <span>₹{calculateTax().toFixed(2)}</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <Button variant="warning" className="checkout-btn">
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
