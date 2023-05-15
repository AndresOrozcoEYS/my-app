import React, { useState, useEffect, createContext, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard';
import SedesCrud from './components/Sedes/SedesCrud';
import UsersCRUD from './components/Usuarios/UsersCRUD';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sedes" element={<SedesCrud />} />
        <Route path="/usuarios" element={<UsersCRUD />} />
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
