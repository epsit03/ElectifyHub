// src/components/Register.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Import the CSS file for styling

const Register = () => {
  const generateCaptcha = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number for captcha
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    role: '',
    password: '',
    confirmPassword: '',
    captcha: '',
  });

  const [captchaCode, setCaptchaCode] = useState(generateCaptcha()); // Initialize captcha code
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'password') {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      setPasswordError(!passwordPattern.test(value));
    }

    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailPattern.test(value));
    }

    if (name === 'captcha') {
      setCaptchaError(value !== captchaCode.toString());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Send form data to backend for registration
    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      // Check if registration was successful
      if (response.ok) {
        alert('Registration successful. You will now be redirected to the login page.');
        window.location.href = '/login'; // Redirect to the login page
      } else if (response.status === 409) {
        // Email already exists, redirect to login page
        alert('Email already registered. Redirecting to login page.');
        window.location.href = '/login'; // Redirect to the login page
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };
  
  

  return (
    <div className="register-container">
      <header className="header">
        <h1>Register</h1>
        <p>Create an account to start using ELECTIFYHUB</p>
      </header>
      <br></br>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          {emailError && <span className="error-message">Invalid email format</span>}
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization:</label>
          <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="organizer">Organizer</option>
            <option value="voter">Voter</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          {passwordError && <span className="error-message">Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number</span>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          {formData.confirmPassword !== '' && formData.password !== formData.confirmPassword && <span className="error-message">Passwords do not match</span>}
        </div>
        <div className="form-group">
          {/* Display the captcha code for user */}
          <label htmlFor="captcha">Captcha:</label>
          <div>{captchaCode}</div>
          <input type="text" id="captcha" name="captcha" placeholder="Enter the number shown" value={formData.captcha} onChange={handleChange} required />
          {captchaError && <span className="error-message">Captcha does not match</span>}
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
      <footer className="footer">
        <p>Already have an account? <Link to="/login" className="login-link">Log In</Link></p>
      </footer>
    </div>
  );
};

export default Register;
