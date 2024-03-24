import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
import './Dashboard.css';
const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Fetch user details from the backend API
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/user-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any authorization headers if required
          },
        });
        const data = await response.json();
        if (response.ok) {
          setFirstName(data.firstName);
          setLastName(data.lastName);
        } else {
          console.error('Failed to fetch user details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div className="home-container">
      <header className="header">
        <h1>ELECTIFYHUB</h1>
      </header>
      
      <div className="cta-buttons">
        <Link to="/" className="cta-button">Log Out</Link>
      </div>
      <div className="welcome-line">
        <p>Welcome, {firstName} {lastName}</p>
      </div>
      <footer className="footer">
        <p>&copy; 2024 ELECTIFYHUB. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
