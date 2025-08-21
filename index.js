import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartApp from './CartApp';
import ExpenseTracker from './ExpenseTracker';
import MovieSearch from './MovieSearch';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<ExpenseTracker />} />
        <Route path="/cart" element={<CartApp />} />
        <Route path="/Moviesearch" element={<MovieSearch />} />
      </Routes>
    </Router>
  </React.StrictMode>
);