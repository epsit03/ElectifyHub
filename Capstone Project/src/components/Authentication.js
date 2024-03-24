import React, { useState } from 'react';
import './Authentication.css'; // Import the CSS file for styling

const Authentication = () => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    if (mode === 'login') {
      // Redirect to register route
      window.location.href = '/register';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const { role } = data.user; // Assuming the role is returned in the response

        if (role === 'organizer') {
          alert('Login successful. Redirecting to dashboard.');
          window.location.href = '/dashboard'; // Redirect to dashboard for organizer
        } else if (role === 'voter') {
          alert('Login successful. Redirecting to voter page.');
          window.location.href = '/voter'; // Redirect to voter page for voter
        } else {
          alert('Login successful. Role not specified. Redirecting to default page.');
          window.location.href = '/default'; // Redirect to default page for other roles
        }
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  const loginForm = (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
      </div>
      <button type="submit">Login</button>
      <p>Don't have an account? <button type="button" onClick={toggleMode}>Register</button></p>
    </form>
  );

  return (
    <div className="authentication-container">
      {mode === 'login' ? loginForm : null}
      {/* Add the registration form if needed */}
    </div>
  );
};

export default Authentication;
