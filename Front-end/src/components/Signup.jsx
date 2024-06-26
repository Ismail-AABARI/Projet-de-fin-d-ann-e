import React, { useState, useEffect } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Utiliser useNavigate pour la navigation

  useEffect(() => {
    document.body.classList.add('signup-body-style');
    return () => {
      document.body.classList.remove('signup-body-style');
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/register', {
        email,
        password
      });

      setSuccessMessage('User registered successfully');
      setError('');
      setTimeout(() => {
        navigate('/login'); // Rediriger vers la page de login après succès
      }, 200); // Rediriger après 2 secondes pour montrer le message de succès
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <div className="signup-page">
        <h1 className='signup-title'>Créez votre compte OrderVista</h1>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSignup}>
          <div className="form-signup">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrer your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-country">
            <div><label htmlFor="country">Pays</label></div>
            <select name="country" id="country" required>
              <option value="United States">United States</option>
              <option value="Algeria">Algeria</option>
              <option value="Argentina">Argentina</option>
              <option value="Australia">Australia</option>
              <option value="Belgium">Belgium</option>
              <option value="Brazil">Brazil</option>
              <option value="Canada">Canada</option>
              <option value="China">China</option>
              <option value="Italy">Italy</option>
              <option value="Japan">Japan</option>
              <option value="Mexico">Mexico</option>
              <option value="Morocco">Morocco</option>
            </select>
          </div>
          <div className="form-signup">
            <div><label htmlFor="password">Mot de passe</label></div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrer your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='bouton'>Créer un compte</button>
        </form>
        <div className="create-account">
          Vous avez déjà un compte ? <Link to='/login' className='connect'>Connectez-vous</Link>
        </div>
      </div>
      <div className='Contenu'>OrderVista</div>
      <div className='left-side'>
        <div>
          <div className='left-design'>
            <div>
              <img src="./src/assets/success.png" alt="" />
            </div>
            <div>
              <span>Lancez-vous rapidement</span>
            </div>
          </div>
          <div className='contenu'>
            Analysez vos commandes et ventes de produits en détail avec notre plateforme. Suivez les tendances en temps réel et identifiez les meilleurs produits.
          </div>
        </div>
        <div>
          <div className='left-design'>
            <div>
              <img src="./src/assets/success.png" alt="" />
            </div>
            <div>
              <span>Analyser vos données pour mieux vendre</span>
            </div>
          </div>
          <div className='contenu'>
            Transformez vos données brutes en informations stratégiques avec nos tableaux de bord intuitifs.
          </div>
        </div>
        <div>
          <div className='left-design'>
            <div>
              <img src="./src/assets/success.png" alt="" />
            </div>
            <div>
              <span>Inscrivez-vous dès maintenant</span>
            </div>
          </div>
          <div className='contenu'>
            Lancez-vous en quelques clics et exploitez pleinement le potentiel de votre activité. Votre succès est notre priorité !
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;