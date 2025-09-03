import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';

const Product = ({ title, price, imageUrl }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdd = () => {
    addToCart({ title, price, imageUrl });
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Link to={`/product/${title}`}>
        <Card.Img variant="top" src={imageUrl} />
      </Link>
      <Card.Body>
        <Link to={`/product/${title}`} className="text-decoration-none fw-bold">
          {title}
        </Link>
        <Card.Text>${price}</Card.Text>
        <Button variant="primary" onClick={handleAdd}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;