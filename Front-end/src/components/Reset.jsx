import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Reset.css';

function Reset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Appliquer les styles au body
    document.body.classList.add('reset-body-style');
    // Retirer les styles du body lorsque le composant est démonté
    return () => {
      document.body.classList.remove('reset-body-style');
    };
  }, []);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/requestPasswordReset', { email, redirectUrl: 'http://localhost:3000/resetPassword' });
      setMessage(response.data.message);
      if (response.data.status === 'PENDING') {
        alert("Un email de réinitialisation a été envoyé");
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <>
      <div className="reset-page">
        <h1 className='reset-title'>Réinitialisation du mot de passe</h1>
        <div className='designer'>
          <span>Saisissez l'adresse e-mail associée à votre compte et nous vous 
            enverrons un lien pour réinitialiser votre mot de passe.</span>
        </div>
        <form onSubmit={handleResetRequest}>
          <div className="form-reset">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Entrer votre email" required />
          </div>
          <button type="submit" className='buttom'>Continuer</button>
        </form>
        <div className="retour">
          <Link to='/login' className='linkage'>Revenir à la page de connexion</Link>
        </div>
        {message && <p>{message}</p>}
      </div>
      <div className='bas-page'>
        Vous n'avez pas de compte ? <Link className='connect' to={'/register'}>S'incrire</Link>
      </div>
      <div className='Content'>
        <div>
          <img src="./src/assets/lock.png" alt="locke/png" />
        </div>
        <div>
          <span>Conseil en matière de sécurité</span>
        </div>
      </div>
      <div className='paragraphe'>
        Installez uniquement les extensions de navigateur provenant d'entreprises en qui vous avez confiance. Certaines extensions de navigateur malveillantes peuvent consulter vos mots de passe et compromettre votre sécurité.
      </div>
    </>
  );
}

export default Reset;
