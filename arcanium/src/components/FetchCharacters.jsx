// plchlder

const BASE_URL = 'http://localhost:5000/api/characters'; 

export const fetchAllCharacters = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const characters = await response.json();
    return characters;
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    throw error;
  }
};

export const fetchCharacterById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const character = await response.json();
    return character;
  } catch (error) {
    console.error(`Failed to fetch character with id ${id}:`, error);
    throw error;
  }
};

export const fetchCharactersByUserId = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const characters = await response.json();
    return characters;
  } catch (error) {
    console.error(`Failed to fetch characters for user ${userId}:`, error);
    throw error;
  }
};
