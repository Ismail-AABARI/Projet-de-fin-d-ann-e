// components/Signin.jsx
import React, { useEffect, useState } from 'react';
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/login', { email, password });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.mytoken);
        navigate('/home'); // Redirigez vers le composant Text après la connexion
      } else {
        setError('Login failed');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };




  
  useEffect(() => {
    document.body.classList.add('signin-body-style');
    return () => {
      document.body.classList.remove('signin-body-style');
    };
  }, []);

  return (
    <div className="container-page">
      <h1 className='login-title'>Connectez-vous à votre compte</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Entrer votre email" 
            required 
          />
        </div>
        <div className="form-group">
          <div><label htmlFor="password">Mot de passe</label></div>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Entrer votre mot de passe" 
            required 
          />
          <span><Link className='password' to='/reset'>Mot de passe oublié ?</Link></span>
        </div>
        <button type="submit" className='bouton'>Connexion</button>
      </form>
      <div className="create-account">
        Vous découvrez OrderVista ? <Link className='compte' to='/register'>Créer un compte</Link>
      </div>
    </div>
  );
};

export default Signin;
