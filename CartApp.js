import React, { useState } from "react";
import "./CartApp.css";

function CartApp() {
  const products = [
    { id: 1, name: "Laptop", price: 500, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop" },
    { id: 2, name: "Phone", price: 300, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop" },
    { id: 3, name: "Tablet", price: 200, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop" },
    { id: 4, name: "Headphones", price: 100, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop" },
    { id: 5, name: "Keyboard", price: 50, image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=150&h=150&fit=crop" },
    { id: 6, name: "Mouse", price: 25, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&h=150&fit=crop" },
    { id: 7, name: "Speaker", price: 75, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=150&h=150&fit=crop" },
    { id: 8, name: "Monitor", price: 150, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&h=150&fit=crop" },
    { id: 9, name: "Printer", price: 100, image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=150&h=150&fit=crop" },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Check if product already exists in cart
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
    } else {
      alert('Item already in cart!');
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      
      <div className="products-section">
        <h3>Products</h3>
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <img 
                src={p.image} 
                alt={p.name}
                className="product-image"
              />
              <div className="product-name">{p.name}</div>
              <div className="product-price">${p.price}</div>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(p)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-section">
        <h3>Cart</h3>
        {cart.length === 0 ? (
          <div className="empty-cart">Your cart is empty</div>
        ) : (
          <ul className="cart-list">
            {cart.map((c, i) => (
              <li key={`${c.id}-${i}`} className="cart-item">
                <div className="cart-item-info">
                  <img 
                    src={c.image} 
                    alt={c.name}
                    className="cart-item-image"
                  />
                  <span className="cart-item-details">{c.name} - ${c.price}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CartApp;
