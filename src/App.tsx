// src/App.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">Login</Link>
        <Link to="/registro">Registro</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
