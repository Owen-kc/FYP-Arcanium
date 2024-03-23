import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Monsters from './pages/Monsters';
import Spells from './pages/Spells'
import Items from './pages/Items';
import Armor from './pages/Armor';
import Feats from './pages/Feats';
import Weapons from './pages/Weapons';
import Backgrounds from './pages/Backgrounds';
import Header from './components/Header';
//import Footer from './components/Footer'
import { ThemeProvider } from '@mui/material/styles';
import FantasyTheme from './components/FantasyTheme';
import HomePageContent from './components/HomePageContent';
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './pages/LoginPage';
import CreateCharacterPage from './pages/CreateCharacterPage';
import ChatbotComp from './chatbot/ChatbotComp';
import ChatbotDungeon from './chatbot/ChatbotDungeon';
import ProfilePrompt from './components/social/ProfilePrompt';
import useProfileCheck from './components/social/useProfileCheck';
import FriendsPage from './components/social/friends/FriendsPage';
import ProfilePage from './components/social/ProfilePage';
import FriendProfile from './components/social/friends/FriendProfile';
import ChatComponent from './components/social/chat/ChatComponent';
import CampaignsPage from './components/social/campaign/CampaignsPage';


function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const { showProfilePrompt, setShowProfilePrompt } = useProfileCheck();


  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <ThemeProvider theme={FantasyTheme}>
      <Router>
        {isAuthenticated ? (
          <>
            <Header />
            {/* Conditionally render the ProfilePrompt */}
            {showProfilePrompt && <ProfilePrompt setShowProfilePrompt={setShowProfilePrompt} />}
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/monsters" element={<Monsters />} />
                <Route path="/items" element={<Items />} />
                <Route path="/spells" element={<Spells />} />
                <Route path="/armor" element={<Armor />} />
                <Route path="/weapons" element={<Weapons />} />
                <Route path="/feats" element={<Feats />} />
                <Route path="/backgrounds" element={<Backgrounds />} />
                <Route path="/dungeon" element={<ChatbotDungeon userId={user.sub} />} />
                <Route path="/create-character" element={<CreateCharacterPage userId={user.sub} />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/friend-profile/:auth0Id" element={<FriendProfile />} />
                <Route path="/chat" element={<ChatComponent />} />
                <Route path="/campaigns" element={<CampaignsPage userId={user.sub} />} />
                {/* Add other routes later */}
              </Routes>
              <ChatbotComp/>
            </main>
          </>
        ) : (
          <LoginPage />
        )}
      </Router>
    </ThemeProvider>
  );
}

function Home() {
  return <div>
  <HomePageContent />
</div>
}

export default App;
