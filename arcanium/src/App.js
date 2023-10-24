import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Monsters from './pages/Monsters';
import Header from './components/Header';
import Footer from './components/Footer'
import { ThemeProvider } from '@mui/material/styles';
import FantasyTheme from './components/FantasyTheme';

function App() {
  return (
    <Router>
      <ThemeProvider theme={FantasyTheme}>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monsters" element={<Monsters />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
        <Footer/>
      </ThemeProvider>
    </Router>
  );
}

function Home() {
  return <div>Welcome to Arcanium!</div>;
}

export default App;
