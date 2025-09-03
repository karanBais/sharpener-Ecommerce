import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const productsArr = [
  {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    title: 'Blue Color',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  }
];

const reviews = [
  { user: "Alfiya", comment: "Amazing quality! Totally worth it.", rating: 5 },
  { user: "John", comment: "Nice colors, fast delivery.", rating: 4 },
  { user: "Priya", comment: "Picture was a bit blurry, but still good.", rating: 3 },
];

const ProductDetailPage = () => {
  const { productId } = useParams();

  const product = productsArr.find((item) => item.title === productId);

  if (!product) {
    return <h2 className="text-center text-danger my-5">Product not found!</h2>;
  }

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={5} className="d-flex flex-column align-items-center">
          <Image src={product.imageUrl} fluid rounded style={{ maxHeight: '400px' }} />
          <Row className="mt-3">
            {[...Array(3)].map((_, idx) => (
              <Col xs={4} key={idx}>
                <Image src={product.imageUrl} thumbnail />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={7}>
          <h3 className="fw-bold">{product.title}</h3>
          <p className="fs-5 text-muted mb-1">Price: <span className="fw-bold">${product.price}</span></p>
          <p className="text-secondary">Stylish printed wallpaper for your room. Made from high-quality material and printed using HD colors.</p>
          <div className="mt-4">
            <h5 className="mb-3">Customer Reviews</h5>
            {reviews.map((review, idx) => (
              <Card className="mb-3" key={idx}>
                <Card.Body>
                  <Card.Title>{review.user}</Card.Title>
                  <Card.Subtitle className="mb-2 text-warning">
                    {"⭐".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </Card.Subtitle>
                  <Card.Text>{review.comment}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;