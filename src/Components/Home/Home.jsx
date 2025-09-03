import React from 'react';
import { Container } from 'react-bootstrap';
import { FaRegPlayCircle } from 'react-icons/fa';
import HomeTour from './HomeTour';
import Footer from '../Footer';

const Home = () => {
  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <div className="text-center bg-secondary py-5">
        <h1 className="display-4 text-white">The Generics</h1>

        <div className="d-flex flex-column align-items-center mt-4">
          <button className="btn btn-outline-light mb-3 px-4 fs-5">
            Get our Latest Album
          </button>

          {/* Play Button using FontAwesome */}
          <button className="btn btn-light rounded-circle d-flex justify-content-center align-items-center p-0" style={{ width: '80px', height: '80px' }}>
            <FaRegPlayCircle className="text-primary fs-1" />
          </button>
        </div>
      </div>

      <HomeTour />
      <Footer />
    </Container>
  );
};

export default Home;
