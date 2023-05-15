import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SedesCrud from '../Sedes/SedesCrud';
import UsersCRUD from '../Usuarios/UsersCRUD';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  const navigate = useNavigate();


  const handleLogout = () => {  
    fetch('http://localhost:3000/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (response.ok) {
          // La sesión se cerró correctamente
          // Realiza las acciones necesarias después del cierre de sesión
          console.log('Sesión cerrada');
          // Redirigir al usuario a la página de inicio de sesión
          navigate('/login');
        } else {
          // Ocurrió un error al cerrar la sesión
          console.log('Error al cerrar la sesión');
        }
      })
      .catch((error) => {
        // Ocurrió un error en la solicitud
        console.log('Error de conexión', error);
      });
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/sedes">Sedes</Link>
          </li>
          <li>
            <Link to="/usuarios">Usuarios</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/sedes" element={<SedesCrud />} />
        <Route path="/usuarios" element={<UsersCRUD />} />
      </Routes>
    </div>
  );
};

export default Navbar;
