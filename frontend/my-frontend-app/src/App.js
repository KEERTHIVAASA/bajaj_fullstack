import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import JSON5 from 'json5';

const API_URL = 'http://127.0.0.1:8000/api/endpoint/'; // Replace with your API endpoint

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
];

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setResponse(null);

    try {
      const parsedData = JSON5.parse(jsonInput);

      // Validate the JSON structure
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error('Invalid JSON structure');
      }

      // Call the backend API
      const res = await axios.post(API_URL, parsedData);
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    const selectedValues = selectedOptions.map(option => option.value);

    let displayData = {};

    if (selectedValues.includes('alphabets')) {
      displayData.alphabets = response.alphabets;
    }
    if (selectedValues.includes('numbers')) {
      displayData.numbers = response.numbers;
    }
    if (selectedValues.includes('highest_lowercase_alphabet')) {
      displayData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <pre>{JSON.stringify(displayData, null, 2)}</pre>
    );
  };

  return (
    <div>
      <h1>My Roll Number</h1>
      <input
        type="text"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here'
      />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Select
        isMulti
        options={options}
        onChange={handleSelectChange}
        value={selectedOptions}
      />

      {renderResponse()}
    </div>
  );
};

export default App;
