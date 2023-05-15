import React, { useState } from "react";
import axios from "axios";
import "./Register.css"

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    lastname: "",
    username: "",
    identification: "",
    password: "",
    active: true,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    // Remove the confirmPassword field
    const { confirmPassword, ...dataToSend } = registerData;
    
    try {
      await axios.post("http://localhost:3000/users/register", dataToSend);
      setRegisterData({
        name: "",
        lastname: "",
        username: "",
        identification: "",
        password: "",
        confirmPassword: "",
        owners: [], // Array vacío para owners
        active: true,
      });
      setErrorMessage("");
      alert("User registered successfully");
    } catch (error) {
      console.log(error);
      alert("An error occurred");
      setErrorMessage(error.response.data.message);
    }
  };
  
  

  return (
    <div className="register">
  <h2>Registro de Usuarios</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={registerData.name}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label htmlFor="lastname">Apellido:</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        value={registerData.lastname}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label htmlFor="username">Nombre de Usuario:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={registerData.username}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label htmlFor="identification">Identificacion:</label>
      <input
        type="text"
        id="identification"
        name="identification"
        value={registerData.identification}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={registerData.password}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label htmlFor="password">Confirmar contraseña:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={registerData.confirmPassword}
        onChange={handleInputChange}
        required
      />
    </div>
    <button type="submit">Registrar</button>
    {errorMessage && <div className="error">{errorMessage}</div>}
  </form>
</div>

  );
};

export default Register;
