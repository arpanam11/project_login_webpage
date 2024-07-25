import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using a frontend framework
import '../style/login.css';
import {  Link } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [registrationError, setRegistrationError] = useState('');

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/users', formData); // Replace with your API endpoint
      console.log('Registration successful:', response.data);
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationError('Registration failed. Please try again.'); // Display user-friendly error message
    }
  };

  // Optional: Implement form validation (consider a validation library like Yup)

  useEffect(() => {
    // Code to fetch initial data from db.json (if needed)
    // This is not recommended for production due to security concerns
    // Consider using a secure backend API for user registration
  }, []);

  return (
    <div>
    <div className='landing_head'>Register</div>
    <div className='landing_h'></div>
    <div className='landing_window p-4'>
    <img src="./website.png" alt="register" class="img-fluid  mx-auto d-block" />

      <form onSubmit={handleSubmit} className='px-5 pt-5'>
        <div className="form-group mt-3">
          <label>Username:</label>
          <input
            type="text"
            className="form-control" // Assuming Bootstrap classes
            id="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            name="username" // Required for state update in handleChange
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control" // Assuming Bootstrap classes
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            name="password" // Required for state update in handleChange
          />
        </div>
        <button type="submit" class="btn btn-primary" >Register</button>
        {registrationError && <p className="error">{registrationError}</p>}
        <br></br>
         <p className='pt-4'>
              <Link to="/">Already have an account? Login</Link>
            </p>
      </form>
    </div>
    </div>
  );
};

export default Register;
