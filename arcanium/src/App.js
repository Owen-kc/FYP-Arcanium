import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dndData, setDndData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const apiUrl = `https://api.open5e.com/monsters/?name=${searchTerm}`;
    
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setDndData(data.results || []);
      })
      .catch((error) => console.error('Error fetching D&D data:', error));
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>D&D Monster Search</h1>
        
        <div>
          <input
            type="text"
            placeholder="Search for a D&D monster..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div>
          {dndData.length > 0 ? (
            <div>
              <h3>Monster Data</h3>
              <ul>
                {dndData.map((item) => (
                  <li key={item.index}>{item.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
