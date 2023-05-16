
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';

import './Login.css';

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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
      const data = await response.json();
      console.log(data);
      console.log(data.token);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <form onSubmit={handleSubmit}>
          <div className="login-content">
            <div className="login-image">
              <img src="https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper.png" alt="Descripción de la imagen" />
            </div>
            <div className="label-container">
              <label htmlFor="username">
                <FontAwesomeIcon icon={faUser} />
                {' '}
                Usuario:
              </label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Ingrese su usuario' />
            </div>
            <div className="label-container">
              <label htmlFor="password">
                <FontAwesomeIcon icon={faLock} />
                {' '}
                Contraseña:
              </label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Ingrese su contraseña' />
            </div>
            <button type="submit">Ingresar</button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </CSSTransition>
    </div>
  );
}

export default Login;
