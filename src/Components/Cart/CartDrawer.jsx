// Enhanced CartDrawer.jsx
import React, { useContext } from 'react';
import { Offcanvas, Button, Image, Alert } from 'react-bootstrap';
import { CartContext } from './CartContext';

const CartDrawer = ({ show, handleClose }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    totalPrice,
    totalQuantity,
    userEmail 
  } = useContext(CartContext);

  const handleQuantityChange = (productId, newQuantity) => {
    const qty = parseInt(newQuantity);
    if (!isNaN(qty) && qty >= 0) {
      updateQuantity(productId, qty);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Cart ({totalQuantity})
        </Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body>
        {!userEmail && (
          <Alert variant="warning" className="py-2">
            <small>Guest mode: Login to save your cart permanently</small>
          </Alert>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-4">
            <p className="mb-2">Your cart is empty</p>
            <Button variant="primary" size="sm" onClick={handleClose}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-items mb-3" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item border-bottom py-3">
                  <div className="d-flex gap-2">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.title} 
                      width="50"
                      height="50"
                      className="rounded object-fit-cover"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1 small">{item.title}</h6>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="text-primary fw-semibold">
                          {formatPrice(item.price)}
                        </span>
                        <div className="d-flex align-items-center gap-1">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            style={{ padding: '2px 6px' }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            −
                          </Button>
                          <span className="px-2 small">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            style={{ padding: '2px 6px' }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="small text-muted">
                          Subtotal: {formatPrice(item.price * item.quantity)}
                        </span>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer border-top pt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-semibold">Total:</span>
                <span className="fw-bold h5 mb-0 text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg">
                  Checkout ({totalQuantity} items)
                </Button>
                <Button variant="outline-secondary" onClick={handleClose}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartDrawer;