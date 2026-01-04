import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Results from './pages/Results';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/math-ocean-challenge">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:difficulty" element={<Game />} />
          <Route path="/results/:score" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;