import React from 'react';

function ProductList({ products, onAddToCart }) {
  return (
    <div>
      <h2>Our Collection</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <span>No Image</span>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-price">${product.price}</div>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                Stock: {product.stock}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
