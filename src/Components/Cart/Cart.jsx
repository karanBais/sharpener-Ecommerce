// Enhanced Cart.jsx (Modal Component)
import React, { useContext, useState } from 'react';
import { Modal, Button, Table, Image, Form, Alert } from 'react-bootstrap';
import { CartContext } from './CartContext';

const Cart = ({ show, handleClose }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalPrice, 
    loading,
    userEmail 
  } = useContext(CartContext);
  
  const [showClearConfirm, setShowClearConfirm] = useState(false);

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
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Your Cart ({cartItems.length} items)
            {!userEmail && (
              <small className="text-muted ms-2">
                (Guest Mode - Login to save cart)
              </small>
            )}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {loading && (
            <Alert variant="info">
              <div className="d-flex align-items-center">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Syncing cart...
              </div>
            </Alert>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-4">
              <p className="mb-0">Your cart is empty.</p>
              <small className="text-muted">Start shopping to add items!</small>
            </div>
          ) : (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id || item.title}>
                      <td>
                        <Image 
                          src={item.imageUrl} 
                          alt={item.title} 
                          width="60"
                          className="rounded"
                        />
                      </td>
                      <td>
                        <strong>{item.title}</strong>
                        {item.addedAt && (
                          <>
                            <br />
                            <small className="text-muted">
                              Added: {new Date(item.addedAt).toLocaleDateString()}
                            </small>
                          </>
                        )}
                      </td>
                      <td>{formatPrice(item.price)}</td>
                      <td style={{ width: '120px' }}>
                        <Form.Control
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id || item.title, e.target.value)}
                          size="sm"
                        />
                      </td>
                      <td>
                        <strong>{formatPrice(item.price * item.quantity)}</strong>
                      </td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item.id || item.title)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <Button 
                    variant="outline-warning" 
                    size="sm"
                    onClick={() => setShowClearConfirm(true)}
                  >
                    Clear Cart
                  </Button>
                  <div className="text-end">
                    <h5 className="mb-0">
                      Total: {formatPrice(totalPrice)}
                    </h5>
                    <small className="text-muted">
                      {cartItems.length} items • {cartItems.reduce((sum, item) => sum + item.quantity, 0)} units
                    </small>
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Continue Shopping
          </Button>
          {cartItems.length > 0 && (
            <Button variant="primary">
              Proceed to Checkout
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Clear Cart Confirmation Modal */}
      <Modal show={showClearConfirm} onHide={() => setShowClearConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Clear Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove all items from your cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClearConfirm(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => {
              clearCart();
              setShowClearConfirm(false);
            }}
          >
            Clear Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;