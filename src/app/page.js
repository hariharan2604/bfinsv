'use client';
import { useState } from 'react';
import Head from 'next/head';
import Select from 'react-select';

export default function Home() {
  const [apiInput, setApiInput] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);

  const options = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' },
  ];

  const validateJson = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (validateJson(apiInput)) {
      setError('');
      try {
        // Simulated response instead of real API call
        const response = {
          data: {
            "is_success": true,
            "user_id": "john_doe_17091999",
            "email": "john@xyz.com",
            "roll_number": "20BCE1234", // Replace with your actual roll number
            "numbers": ["1", "334", "4"],
            "alphabets": ["A", "C", "Z", "c", "i"],
            "highest_lowercase_alphabet": ["i"]
          }
        };
        setData(response.data);
      } catch (e) {
        setError('API Error');
      }
    } else {
      setError('Invalid JSON');
    }
  };

  const handleFilter = () => {
    if (!data) return;

    let filtered = [];
    if (selectedOptions.some(option => option.value === 'Alphabets')) {
      filtered = [...filtered, ...data.alphabets];
    }
    if (selectedOptions.some(option => option.value === 'Numbers')) {
      filtered = [...filtered, ...data.numbers];
    }
    if (selectedOptions.some(option => option.value === 'Highest lowercase alphabet')) {
      const lowercaseLetters = data.highest_lowercase_alphabet;
      if (lowercaseLetters.length > 0) {
        filtered.push(lowercaseLetters[0]);
      }
    }
    setFilteredResponse(filtered);
  };

  return (
    <>
      <Head>
        <title>20BCE1234</title> {/* Replace with your roll number */}
      </Head>
      <div style={styles.container}>
        <label htmlFor="apiInput" style={styles.label}>API Input</label>
        <input
          type="text"
          id="apiInput"
          placeholder='{"data":["M","1","334","4","B"]}'
          value={apiInput}
          onChange={(e) => setApiInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.submitButton}>Submit</button>

        {error && <p style={styles.error}>{error}</p>}

        {data && (
          <>
            <label htmlFor="filterType" style={styles.label}>Multi Filter</label>
            <Select
              id="filterType"
              isMulti
              options={options}
              value={selectedOptions}
              onChange={setSelectedOptions}
              styles={customSelectStyles}
            />
            <div style={{ marginTop: '10px' }}>
              {filteredResponse.length > 0 && (
                <div style={styles.response}>
                  <p>Filtered Response: {filteredResponse.join(', ')}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '10px',
    // backgroundColor: '#fff',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
    marginBottom: '10px',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  response: {
    marginTop: '10px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f7f7f7',
    border: '1px solid #ddd',
  }
};

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '5px',
    borderColor: '#ccc',
    fontSize: '14px',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '2px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff',
    ':hover': {
      backgroundColor: '#0056b3',
      color: '#fff',
    },
  }),
};
