import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../../css/formulaireInscription.css";

export const FormulaireInscription = () => {
  const [email, setEmail] = useState("");
  const [password, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          roleId: 1,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      // En cas de succès, redirige vers la page de connexion
      navigate('/connexion');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-left">
        <div className="form-title">KeyChoose</div>

        <div className="form-section">
          <h1 className="form-heading">Inscription</h1>

          <div className="flex flex-col gap-5">
            {/* Champ Email */}
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
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
              <input
                type="password"
                value={password}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="Mot de passe"
                className="password-field"
                required
              />
            </div>

            {/* Erreur */}
            {error && <p className="error-message">{error}</p>}

            {/* Bouton */}
            <button className="submit-button" type="submit">
              Inscription
            </button>

            {/* Séparateur */}
            <div className="separator">
              <div className="separator-line" />
              <span className="separator-text">ou</span>
              <div className="separator-line" />
            </div>
          </div>

          {/* Lien de connexion */}
          <p className="login-text">
            Vous avez déjà un compte ?{' '}
            <Link to="/connexion" className="login-link">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>

      {/* Partie droite avec image */}
      <div className="image-container">
        <div className="image-block image-left"></div>
        <div className="image-block image-right"></div>
      </div>
    </form>
  );
};