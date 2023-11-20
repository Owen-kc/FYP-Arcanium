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


function App() {
  return (
    <Router>
      <ThemeProvider theme={FantasyTheme}>
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
      </ThemeProvider>
    </Router>
  );
}

function Home() {
  return <div>
  <HomePageContent />
</div>
}

export default App;
