import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
      const data = await response.json();
      console.log(data);
      console.log(data.token);
      localStorage.setItem('token', data.token);
      navigate('/sedes');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
       <h2>Inicio de Sesion</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de Usuario:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Log in</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
