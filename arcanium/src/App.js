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
<<<<<<< Updated upstream
=======
import HomePageContent from './components/HomePageContent';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AuthPage from './pages/AuthPage';
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <ThemeProvider theme={FantasyTheme}>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePageContent />} />
            <Route path="/monsters" element={<Monsters />} />
            <Route path="/items" element={<Items />} />
            <Route path="/spells" element={<Spells />} />
            <Route path="/armor" element={<Armor />} />
            <Route path="/weapons" element={<Weapons />} />
            <Route path="/feats" element={<Feats />} />
            <Route path="/backgrounds" element={<Backgrounds />} />
            <Route path="/auth" element={<AuthPage />} /> {/* Corrected this line */}
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}


function Home() {
  return <div>Welcome to Arcanium!</div>;
}

export default App;
