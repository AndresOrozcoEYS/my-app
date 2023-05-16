import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    lastname: "",
    username: "",
    identification: "",
    password: "",
    confirmPassword: "",
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
    try {
      await axios.post("http://localhost:3000/users/register", registerData);
      setRegisterData({
        name: "",
        lastname: "",
        username: "",
        identification: "",
        password: "",
        confirmPassword: "",
        active: true,
      });
      setErrorMessage("");
      alert("User registered successfully");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      alert("Error al registrar:");
    }
  };

  const handleGoBack = () => {
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <div className="register">
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Registro Usuario</h2>
            <label htmlFor="name">Nombre:</label>
            <input
              placeholder="Ingresa tu nombre"
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
              placeholder="Ingresa tu Apellido"
              type="text"
              id="lastname"
              name="lastname"
              value={registerData.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Usuario:</label>
            <input
              placeholder="Crea tu Usuario"
              type="text"
              id="username"
              name="username"
              value={registerData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="identification">Identificación:</label>
            <input
              placeholder="Digita tu ID"
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
              placeholder="EXAmpleeeE@30123//"
              type="password"
              id="password"
              name="password"
              value={registerData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <input
              placeholder="Ingresa tu contraseña de nuevo"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value              ={registerData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="buttons-container">
            <button
              className="back-button fade"
              type="button"
              onClick={handleGoBack}
            >
              Regresar a login
            </button>
            <CSSTransition
              in={true}
              appear={true}
              timeout={500}
              classNames="fade"
            >
              <button type="submit" id="register-button">
                Registrar
              </button>
            </CSSTransition>
          </div>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
      </CSSTransition>
    </div>
  );
};

export default Register;