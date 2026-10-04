import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import Cart from './components/Cart';

function AppContent() {
  const { user, logout, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
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
      alert('Product added successfully!');
    } catch (error) {
      alert('Error adding product: ' + error.response?.data?.error);
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      const response = await axios.put(`/api/products/${id}`, productData);
      setProducts(products.map(p => p._id === id ? response.data : p));
      alert('Product updated successfully!');
    } catch (error) {
      alert('Error updating product: ' + error.response?.data?.error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
        alert('Product deleted successfully!');
      } catch (error) {
        alert('Error deleting product: ' + error.response?.data?.error);
      }
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
      alert('Checkout failed: ' + error.response?.data?.error);
    }
  };

  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="App">
      <nav className="navbar">
        <h1>👕 Meryem Store</h1>
        <div className="nav-buttons">
          <span className="user-info">👤 Admin: {user.email}</span>
          <button onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({cart.length})
          </button>
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        <AdminPanel
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />

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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
