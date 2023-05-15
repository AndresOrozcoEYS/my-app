import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../Sedes/SedesCrud.css';
import Navbar from '../Navbar/Navbar';

const UsersCRUD = () => {
  const [usersData, setUsersData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUsersData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUsersData(data);
        } else if (response.status === 401) {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchUsersData();
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const deleteUser= (id) => {
    const token2 = localStorage.getItem('token');

    const fetchUsersData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/'+id, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token2}`
          }
        });

        if (response.ok) {
          alert("User deleted successfully")
        } else if (response.status === 401) {
        }
      } catch (error) {
        alert(error.message)
        console.log(error);
      }
    };
    if (token2) {
      fetchUsersData();
    }

    
  }

  const handleEdit = (id) => {

  } 
  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar Usuario?',
      text: `Estás seguro de que deseas eliminar al usuario con ID: ${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
        Swal.fire('Eliminado!', 'El usuario ha sido eliminado correctamente.', 'success');
        // Recargar la página actual
      window.location.reload();
      }
    });
  };

  if (!isAuthorized) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h1 style={{ textAlign: 'center' }}>No estás autorizado para acceder a esta página.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Navbar />
      <h1>CRUD de Usuarios</h1>
      {usersData.length === 0 ? (
        <p className="no-data-message">No hay datos disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Usuario</th>
              <th>Identificación</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.username}</td>
                <td>{user.identification}</td>
                <td>{user.active ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(user._id)}>
                    <i className="fa fa-edit"></i>
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(user._id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersCRUD;
