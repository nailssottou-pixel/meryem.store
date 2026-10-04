import React from 'react';

function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout, onClose }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Shopping Cart</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.productId} className="cart-item">
                <div style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                    className="btn"
                    style={{ padding: '0.25rem 0.5rem' }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: '30px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                    className="btn"
                    style={{ padding: '0.25rem 0.5rem' }}
                  >
                    +
                  </button>
                </div>
                <div style={{ marginLeft: '1rem', minWidth: '100px', textAlign: 'right' }}>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => onRemoveItem(item.productId)}
                    className="btn btn-danger"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid #ddd' }}>
              <div className="cart-total">
                Total: ${total.toFixed(2)}
              </div>
              <button
                onClick={onCheckout}
                className="btn btn-success"
                style={{ width: '100%', padding: '1rem' }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
