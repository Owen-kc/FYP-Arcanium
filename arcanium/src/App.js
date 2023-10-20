import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [monsterData, setMonsterData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);  // New state for autocomplete suggestions

  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchMonsters = async () => {
    const response = await fetch(`https://api.open5e.com/monsters/?search=${searchTerm}`);
    const data = await response.json();
    const filteredResults = data.results.filter(monster => !monster.slug.includes('a5e'));
    setMonsterData(filteredResults);
    setSuggestions(filteredResults);  // Update suggestions based on search results
  };

  useEffect(() => {
    if (searchTerm) {
      const debouncedFetch = debounce(fetchMonsters, 500);
      debouncedFetch();
    } else {
      setMonsterData([]);
      setSuggestions([]);  // Clear suggestions if search term is empty
    }
  }, [searchTerm]);

  // Function to handle suggestion click
  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setSuggestions([]);  // Clear suggestions after selection
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search for a monster"
      />
      <div className="suggestions">
        {suggestions.slice(0, 5).map(monster => (
          <div 
            key={monster.slug}
            onClick={() => handleSuggestionClick(monster.name)}
          >
            {monster.name}
          </div>
        ))}
      </div>
      {monsterData.map(monster => (
        <div key={monster.slug}>
          <h2>{monster.name}</h2>
          <p>{monster.size}</p>
          <p>{monster.type}</p>
          <p>{monster.alignment}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
