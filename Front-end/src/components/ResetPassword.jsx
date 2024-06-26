import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { userId, resetString } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validation du formulaire
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/resetPassword', {
        userId,
        resetString,
        newPassword
      });

      if (response.data.status === 'SUCCESS') {
        setMessage('Mot de passe réinitialisé avec succès');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Échec de la réinitialisation du mot de passe');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="reset-password-page">
      <h1 className="reset-password-title">Réinitialisation du mot de passe</h1>
      <form onSubmit={handleResetPassword}>
        <div className="form-reset-password">
          <label htmlFor="newPassword">Nouveau mot de passe</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Entrez votre nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-reset-password">
          <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirmez votre nouveau mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">Réinitialiser le mot de passe</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default ResetPassword;