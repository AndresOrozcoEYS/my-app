import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './SedesCrud.css';
import Navbar from '../Navbar/Navbar';

const SedesCrud = () => {
  const [sedesData, setSedesData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchSedesData = async () => {
      try {
        const response = await fetch('http://localhost:3000/sedes/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setSedesData(data);
        } else {
          setIsAuthorized(false);
          console.log(response);
        }
      } catch (error) {
        setIsAuthorized(false);
        console.log(error);
      }
    };

    if (token) {
      fetchSedesData();
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const handleEdit = (id) => {
    // Mostrar el modal de edición
    Swal.fire({
      title: 'Editar Sede',
      html: `Aquí puedes editar la sede con ID: ${id}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      allowEscapeKey: false,
      focusConfirm: false,
      preConfirm: () => {
        alert("Edit");
        // Aquí puedes realizar la lógica de actualización de la sede
        // y actualizar los datos en el estado
        // setSedesData(updatedData);
      }
    });
  };

  const handleDeleteOwner = (id) => {
    Swal.fire({
      title: '¿Eliminar Sede?',
      text: `Estás seguro de que deseas eliminar la sede con ID: ${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: () => {
        alert("Eliminar");
      }
    });
  };

  const deleteSedes = (id) => {
    const token = localStorage.getItem('token');
  
    fetch(`http://localhost:3000/sedes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          console.log('Sede eliminada');
          alert('Sede eliminada');
        } else {
          // Ocurrió un error al eliminar la sede
          alert('Error al eliminar la sede');
          console.log('Error al eliminar la sede');
        }
      })
      .catch((error) => {
        // Ocurrió un error en la solicitud
        alert('Error de conexión', error);
        console.log('Error de conexión', error);
      });
  };
  
  const createSede = () => {};

  const handleDelete = (id) => {
    // Mostrar el modal de confirmación de eliminación
    Swal.fire({
      title: '¿Eliminar Sede?',
      text: `Estás seguro de que deseas eliminar la sede con ID: ${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: () => {
       deleteSedes(id);
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

  if (sedesData.length === 0) {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>CRUD de Sedes</h1>
        <p>No hay datos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Navbar/>
      <h1>CRUD de Sedes</h1>
      <button className="create-button" onClick={createSede}>
        Crear Sede
      </button>
      {sedesData.length === 0 ? (
        <p className="no-data-message">No hay datos disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Location</th>
              <th>City</th>
              <th>Address</th>
              <th>Zipcode</th>
              <th>Owners</th>
              <th>Active</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sedesData.map((sede) => (
              <tr key={sede._id}>
                <td>{sede._id}</td>
                <td>{sede.name}</td>
                <td>{sede.phone}</td>
                <td>{sede.location}</td>
                <td>{sede.city}</td>
                <td>{sede.address}</td>
                <td>{sede.zipcode}</td>
                <td>
                  {sede.owners.map((owner) => (
                    <div key={owner._id}>
                      <td>{owner.id}</td>
                      <td>{owner}</td>
                      <button className="delete-owner-button" onClick={() => handleDeleteOwner(owner.id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </td>
                <td>{sede.active ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(sede._id)}>
                    <i className="fa fa-edit"></i>
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(sede._id)}>
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

export default SedesCrud;