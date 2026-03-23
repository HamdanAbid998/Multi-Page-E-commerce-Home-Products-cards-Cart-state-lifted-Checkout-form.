import { useState } from "react";
import "./App.css";

const PRODUCTS = [
  { id: 1, name: "PHONE", price: 450, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800" },
  { id: 2, name: "LAPTOP", price: 900, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800" },
  { id: 3, name: "CONSOLE", price: 1500, img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800" }
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i));
    } else {
      setCart([...cart, {...product, qty: 1}]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(i => i.id === id ? {...i, qty: Math.max(1, i.qty + delta)} : i));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="container">
      <nav className="home-nav">
        <button className="nav-home-btn" onClick={() => window.location.reload()}>HOME</button>
        <span> / STORE</span>
      </nav>
      
      <h1 className="main-title">PRODUCTS</h1>
      <div className="product-grid">
        {PRODUCTS.map(p => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price-tag">${p.price}</p>
            <button onClick={() => addToCart(p)}>ADD_TO_CART</button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-section">
          <hr />
          <h1 className="main-title">CART</h1>
          {cart.map(item => (
            <div key={item.id} className="cart-row">
              <span>{item.name}</span>
              <div className="controls">
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <code className="qty">{item.qty}</code>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>
              <button className="delete" onClick={() => setCart(cart.filter(i => i.id !== item.id))}>X</button>
            </div>
          ))}
          <h2 style={{textAlign: 'center', marginTop: '20px'}}>TOTAL: ${total}</h2>

          <hr />
          <h1 className="main-title">CHECKOUT</h1>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="FULL_NAME" required />
            <input placeholder="EMAIL_ADDRESS" required />
            <textarea placeholder="SHIPPING_ADDRESS" required />
            <button type="submit" className="buy-btn">CONFIRM_PURCHASE</button>
          </form>
        </div>
      )}
    </div>
  );
}