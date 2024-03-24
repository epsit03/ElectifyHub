// src/components/Voting.js

import React, { useState } from 'react';

const Voting = () => {
  // State for storing selected option
  const [selectedOption, setSelectedOption] = useState('');

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Function to handle vote submission
  const handleSubmitVote = () => {
    // Submit vote using blockchain integration
    console.log('Vote submitted:', selectedOption);
    // You can implement blockchain integration here
  };

  return (
    <div>
      <h2>Voting Page</h2>
      <p>Please select your preferred option:</p>
      <div>
        <label>
          <input
            type="radio"
            name="option"
            value="Option 1"
            checked={selectedOption === 'Option 1'}
            onChange={() => handleOptionSelect('Option 1')}
          />
          Option 1
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="option"
            value="Option 2"
            checked={selectedOption === 'Option 2'}
            onChange={() => handleOptionSelect('Option 2')}
          />
          Option 2
        </label>
      </div>
      {/* Add more options as needed */}
      <button onClick={handleSubmitVote}>Submit Vote</button>
    </div>
  );
};

export default Voting;
