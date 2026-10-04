import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import Cart from './components/Cart';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.productId === product._id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { productId: product._id, name: product.name, price: product.price, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      const response = await axios.post('/api/products', productData);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      const response = await axios.put(`/api/products/${id}`, productData);
      setProducts(products.map(p => p._id === id ? response.data : p));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post('/api/checkout', { items: cart });
      alert('Order placed successfully!');
      setCart([]);
      setShowCart(false);
      fetchProducts();
    } catch (error) {
      alert('Checkout failed: ' + error.response.data.error);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>👕 Clothing Store</h1>
        <div className="nav-buttons">
          <button onClick={() => setIsAdmin(!isAdmin)}>
            {isAdmin ? 'Customer' : 'Admin'}
          </button>
          <button onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({cart.length})
          </button>
        </div>
      </nav>

      <div className="container">
        {isAdmin ? (
          <AdminPanel
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        ) : (
          <ProductList products={products} onAddToCart={addToCart} />
        )}

        {showCart && (
          <Cart
            cartItems={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
            onClose={() => setShowCart(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
