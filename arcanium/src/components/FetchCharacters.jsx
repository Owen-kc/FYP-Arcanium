import React, { useState, useEffect } from 'react';


// TEST CODE. TO UPDATE
const FetchCharacters = ({ userId, onCharacterSelect }) => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCharactersByUID = async () => {
      setIsLoading(true);
      try {
        // Updated endpoint to match your provided API routing
        const response = await fetch(`http://localhost:5000/api/characters/user/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if(userId) {
      fetchCharactersByUID();
    }
  }, [userId]);

  if (isLoading) return <div>Loading characters...</div>;
  if (!characters.length) return <div>No characters found. Proceed with Free Play.</div>;

  return (
    <div>
      <h3>Choose your character:</h3>
      {characters.map(character => (
        <div key={character._id} onClick={() => onCharacterSelect(character)}>
          {character.details.name} - {character.class} - {character.race}
          <p>{character.details.backstory ? character.details.backstory.substring(0, 100) + '...' : 'No backstory provided'}</p>
        </div>
      ))}
      <button onClick={() => onCharacterSelect(null)}>Free Play</button> 
    </div>
  );
};

export default FetchCharacters;
