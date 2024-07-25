import React from 'react';
import './App.css';
import Homepage from './component/Homepage';
import Login from './component/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './component/Register';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
