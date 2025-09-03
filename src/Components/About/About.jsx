import React from 'react'
import { Container } from 'react-bootstrap';
import AboutHero from './AboutHero';
import Footer from '../Footer';


const About = () => {
  return (
    <Container fluid>
      <div className="text-center bg-secondary py-5 w-100 ">
        <h1 className="display-4 text-white">The Generics</h1>
      </div>

      <AboutHero />
      <Footer />
    </Container>
  )
}

export default About
