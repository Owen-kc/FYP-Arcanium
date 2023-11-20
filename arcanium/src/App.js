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

function App() {
  const { isAuthenticated, isLoading } = useAuth0();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={FantasyTheme}>
    <Router>
      {isAuthenticated ? (
        <main>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monsters" element={<Monsters />} />
            <Route path="/items" element={<Items />} />
            <Route path="/spells" element={<Spells />} />
            <Route path="/armor" element={<Armor />} />
            <Route path="/weapons" element={<Weapons />} />
            <Route path="/feats" element={<Feats />} />
            <Route path="/backgrounds" element={<Backgrounds />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
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
