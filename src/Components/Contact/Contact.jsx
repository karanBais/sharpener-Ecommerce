import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'https://sharpener-movie-1235c-default-rtdb.firebaseio.com/contactus.json',
        formData
      );
      alert('Data submitted successfully! 🎉');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error submitting data: ', error);
      alert('Something went wrong 😢');
    }
  };

  return (
    <Container className='w-full'>
      <form className="w-50 mx-auto bg-light p-5" onSubmit={handleSubmit}>
        <div className="d-flex flex-column mb-3">
          <label htmlFor="name" className='fw-bold fs-5'>Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="d-flex flex-column mb-3">
          <label htmlFor="email" className='fw-bold fs-5'>Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="d-flex flex-column mb-3">
          <label htmlFor="phone" className='fw-bold fs-5'>Phone Number</label>
          <input type="number" name="phone" id="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="d-flex flex-column mb-3 w-50 mx-auto">
          <button className='bg-primary text-white border-none'>Submit</button>
        </div>
      </form>
    </Container>
  );
};

export default Contact;
