import config from '../config'

// Function to fetch all characters from the server
export const fetchAllCharacters = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/api/characters`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    throw error;
  }
};

// Function to fetch a character by ID from the server
export const fetchCharacterById = async (id) => {
  try {
    const response = await fetch(`${config.apiUrl}/api/characters/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch character with id ${id}:`, error);
    throw error;
  }
};

// Function to fetch characters by user ID from the server
export const fetchCharactersByUserId = async (userId) => {
  try {
    const response = await fetch(`${config.apiUrl}/api/characters/user/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch characters for user ${userId}:`, error);
    throw error;
  }
};

