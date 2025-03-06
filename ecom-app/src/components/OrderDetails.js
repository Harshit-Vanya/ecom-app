import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaLock, FaComments, FaTimes, FaCheck, FaArrowLeft } from 'react-icons/fa';
import '../styles/OrderDetails.css';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showChatModal, setShowChatModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRatingSuccess, setShowRatingSuccess] = useState(false);

  useEffect(() => {
    const mockOrder = {
      orderId: "FL2023456789",
      orderedOn: "25 Feb 2023",
      currentStep: 4,
      product: {
        image: "https://via.placeholder.com/150",
        name: "Sample Product",
        seller: "ABC Retail",
      },
      shipping: {
        name: "John Doe",
        address: "123 Main Street, City, Country",
        phone: "1234567890",
      },
      progress: [
        "Order Placed",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
      ],
      deliveryUpdates: [
        { status: "Out for Delivery", time: "Today, 10:30 AM", location: "Bangalore" },
        { status: "Reached Delivery Hub", time: "Yesterday, 8:15 PM", location: "Bangalore Delivery Hub" },
        { status: "Shipped", time: "27 Feb 2023, 2:45 PM", location: "Mumbai Warehouse" },
        { status: "Packed", time: "26 Feb 2023, 11:20 AM", location: "Mumbai Warehouse" },
        { status: "Order Placed", time: "25 Feb 2023, 9:45 AM" },
      ],
      price: {
        list: 1200,
        selling: 999,
        discount: 201,
        special: 800,
        handling: 10,
        platform: 5,
        extraDiscount: 50,
        final: 745,
      },
      payment: {
        method: "Cash on Delivery",
      },
      coupon: "WELCOME10",
    };
    setOrder(mockOrder);
  }, []);

  const handleCancelOrder = () => {
    // In a real app, this would call an API to cancel the order
    alert(`Order ${order.orderId} has been cancelled`);
    setShowCancelModal(false);
  };

  const handleSubmitRating = () => {
    // In a real app, this would call an API to submit the rating
    console.log(`Submitted rating: ${rating}, feedback: ${feedback}`);
    setRating(0);
    setFeedback("");
    setShowRatingSuccess(true);
  };

  if (!order) return (
    <Container className="mt-5 text-center">
      <div className="loading-spinner">
        <h2>Loading order details...</h2>
      </div>
    </Container>
  );

  return (
    <Container className="order-details-container my-5">
      <div className="order-details-wrapper">
        {/* Back Button and Title */}
        <div className="order-header">
          <Link to="/" className="back-button">
            <FaArrowLeft /> Back
          </Link>
          <h2 className="order-title">Order #{order.orderId}</h2>
          <p className="order-date">Ordered on {order.orderedOn}</p>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <img src={order.product.image} alt="Product" className="product-image" />
          <div className="product-details">
            <h3 className="product-name">{order.product.name}</h3>
            <p className="seller-info">Sold by: {order.product.seller}</p>
          </div>
        </div>

        {/* Order Progress */}
        <div className="progress-section">
          <h3 className="section-title">Order Progress</h3>
          <div className="progress-tracker">
            {order.progress.map((step, index) => (
              <div key={index} className={`progress-step ${index <= order.currentStep ? 'completed' : ''}`}>
                <div className="step-number">
                  {index <= order.currentStep ? <FaCheck /> : index + 1}
                </div>
                <p className="step-label">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Updates */}
        <div className="delivery-section">
          <h3 className="section-title">Delivery Updates</h3>
          <div className="delivery-updates">
            {order.deliveryUpdates.map((update, index) => (
              <div key={index} className="update-item">
                <div className="update-marker">
                  <div className="marker-dot"></div>
                  {index !== order.deliveryUpdates.length - 1 && <div className="marker-line"></div>}
                </div>
                <div className="update-content">
                  <p className="update-status">{update.status}</p>
                  <p className="update-time">{update.time} {update.location && `(${update.location})`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Details */}
        <div className="shipping-section">
          <h3 className="section-title">Shipping Details</h3>
          <div className="info-box">
            <p className="shipping-name">{order.shipping.name}</p>
            <p className="shipping-address">{order.shipping.address}</p>
            <p className="shipping-phone">{order.shipping.phone}</p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="price-section">
          <h3 className="section-title">Price Breakdown</h3>
          <div className="info-box">
            <div className="price-item">
              <span>List Price:</span>
              <span className="strike-through">₹{order.price.list}</span>
            </div>
            <div className="price-item">
              <span>Selling Price:</span>
              <span>₹{order.price.selling}</span>
            </div>
            <div className="price-item discount">
              <span>Extra Discount:</span>
              <span>-₹{order.price.extraDiscount}</span>
            </div>
            <div className="price-item">
              <span>Special Price:</span>
              <span>₹{order.price.special}</span>
            </div>
            <div className="price-item">
              <span>Handling Fee:</span>
              <span>₹{order.price.handling}</span>
            </div>
            <div className="price-item">
              <span>Platform Fee:</span>
              <span>₹{order.price.platform}</span>
            </div>
            <div className="price-item total">
              <span>Total Amount:</span>
              <span>₹{order.price.final}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-section">
          <h3 className="section-title">Payment Method</h3>
          <div className="info-box">
            <p>{order.payment.method}</p>
          </div>
        </div>

        {/* Coupons & Discounts */}
        <div className="coupon-section">
          <h3 className="section-title">Coupons & Discounts</h3>
          <div className="info-box">
            <p className="coupon-code">{order.coupon}</p>
          </div>
        </div>

        {/* Order Actions */}
        <div className="actions-section">
          <div className="action-buttons">
            <button className="chat-button" onClick={() => setShowChatModal(true)}>
              <FaComments /> Chat with us
            </button>
            <button className="cancel-button" onClick={() => setShowCancelModal(true)}>
              <FaTimes /> Cancel Order
            </button>
          </div>
        </div>

        {/* Rate Your Experience */}
        <div className="rating-section">
          <h3 className="section-title">Rate Your Experience</h3>
          <div className="rating-content">
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={star <= rating ? 'active' : ''}
                >
                  <FaStar />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <div className="feedback-form">
                <textarea
                  placeholder="Tell us about your experience (optional)"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <button className="submit-button" onClick={handleSubmitRating}>
                  Submit Rating
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Chat Support</h4>
              <button onClick={() => setShowChatModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <p>Chat support will be available soon.</p>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Cancel Order</h4>
              <button onClick={() => setShowCancelModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to cancel this order?</p>
              <div className="modal-actions">
                <button className="cancel-button" onClick={() => setShowCancelModal(false)}>No, Keep Order</button>
                <button className="confirm-button" onClick={handleCancelOrder}>Yes, Cancel Order</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rating Success Modal */}
      {showRatingSuccess && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Thank You!</h4>
              <button onClick={() => setShowRatingSuccess(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <p>Your rating has been submitted successfully.</p>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default OrderDetails; 