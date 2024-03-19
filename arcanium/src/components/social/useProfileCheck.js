// useProfileCheck.js
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const useProfileCheck = () => {
  const { isAuthenticated, user } = useAuth0();
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.get(`/api/profile-exists/${user.sub}`);
          if (response.status === 200 && !response.data.exists) {
            setShowProfilePrompt(true);
          }
        } catch (error) {
          console.error('Error checking user profile:', error);
          setShowProfilePrompt(true); 
        }
      }
    };

    if (isAuthenticated) {
      checkUserProfile();
    }
  }, [isAuthenticated, user]);

  return { showProfilePrompt, setShowProfilePrompt };
};

export default useProfileCheck;