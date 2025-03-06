import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavScrollExample from './components/Navbar';
import HomePage from './components/HomePage';
import OrderDetails from './components/OrderDetails';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavScrollExample />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order-tracking" element={<OrderDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
