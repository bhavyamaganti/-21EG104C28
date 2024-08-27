import React, { useState } from 'react';
import './App.css';

function App() {
  const [numberType, setNumberType] = useState('p');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleNumberTypeChange = (event) => {
    setNumberType(event.target.value);
  };

  const calculateAverage = async () => {
    try {
      setError(null);
      const res = await fetch(`http://localhost:9876/numbers/${numberType}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data from the server.');
      }
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Average Calculator Microservice</h1>
      <label htmlFor="numberType">Select Number Type:</label>
      <select id="numberType" value={numberType} onChange={handleNumberTypeChange}>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>
      <button onClick={calculateAverage}>Calculate Average</button>

      <h2>Response:</h2>
      <div id="response">
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default App;

