import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const ProfilePage = () => {
  const { userId } = useParams(); 
  const [userProfile, setUserProfile] = useState(null);
  const [characters, setCharacters] = useState([]);

  // Fetch the user's profile and characters when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await axios.get(`/api/profiles/${userId}`);  // Fetch the user's profile
        setUserProfile(profileResponse.data);

        const charactersResponse = await axios.get(`/api/characters/user/${userId}`); // Fetch the user's characters
        setCharacters(charactersResponse.data);
      } catch (error) {
        console.error('Error fetching user profile and characters:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userProfile.name}</h1>
      <img src={userProfile.picture} alt={`${userProfile.name}'s profile`} />
      <p>{userProfile.bio}</p>
      <h2>Characters</h2>
      <ul>
        {characters.map(character => (
          <li key={character._id}>{character.name} - {character.class}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
