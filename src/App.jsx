import { useState } from "react";
import "./App.css";

function App() {
  const [products] = useState([
    { 
      id: 1, 
      name: "Phone", 
      price: 500, 
      image: "https://images.unsplash.com/photo-1592890288564-76628a30a657?w=400" 
    },
    { 
      id: 2, 
      name: "Laptop", 
      price: 1000, 
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" 
    },
    { 
      id: 3, 
      name: "Gaming Console", 
      price: 2000, 
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400" 
    }
  ]);

  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({ fullName: "", email: "", address: "" });

  // Cart Functions
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  const decreaseQty = (id) => setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  const removeItem = (id) => setCart(cart.filter(item => item.id !== id));
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Form Functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert(`Success! Order placed for ${formData.fullName}. Total: $${total}`);
    setCart([]);
    setFormData({ fullName: "", email: "", address: "" });
  };

  return (
    <div id="center">
      <header>
        <h1>PRODUCTS</h1>
      </header>

      <section className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <button className="add-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </section>

      {cart.length > 0 && (
        <section className="cart-section">
          <hr className="divider" />
          <h1>CART</h1>
          <div className="cart-list">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span className="counter">{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <h2>Total: ${total}</h2>

          <hr className="divider" />
          <h1>CHECKOUT</h1>
          <form onSubmit={handleCheckout} className="checkout-form">
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
            <textarea name="address" placeholder="Shipping Address" value={formData.address} onChange={handleInputChange} required />
            <button type="submit" className="checkout-btn">Place Order</button>
          </form>
        </section>
      )}
    </div>
  );
}

export default App;