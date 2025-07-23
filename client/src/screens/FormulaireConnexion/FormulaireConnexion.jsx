import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../../css/formulaireInscription.css";

export const FormulaireConnexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la connexion');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      navigate('/profil');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-left">
        <div className="form-title">KeyChoose</div>

        <div className="form-section">
          <h1 className="form-heading">Connexion</h1>

          <div className="flex flex-col gap-5">
            {/* Champ Email */}
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@gmail.com"
                className="input-field"
                required
              />
            </div>

            {/* Champ mot de passe */}
            <div className="password-group">
              <label className="input-label" htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="password-field"
                required
              />
            </div>

            {/* Erreur */}
            {error && <p className="error-message">{error}</p>}

            {/* Bouton */}
            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Connexion...' : 'Connexion'}
            </button>

            {/* Séparateur */}
            <div className="separator">
              <div className="separator-line" />
              <span className="separator-text">ou</span>
              <div className="separator-line" />
            </div>
          </div>

          {/* Lien d'inscription */}
          <p className="login-text">
            Pas de compte ?{' '}
            <Link to="/inscription" className="login-link">
              Créer le
            </Link>
          </p>
        </div>
      </div>

      {/* Partie droite avec images */}
      <div className="image-container">
        <div className="image-block image-left"></div>
        <div className="image-block image-right"></div>
      </div>
    </form>
  );
};