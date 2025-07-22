import React, { useState } from "react";
import "../../css/formulaireInscription.css";
import clavierImage from "../../image/jpeg/inscription_keyboards.jpg";
import { Link } from "react-router-dom";

export const FormulaireConnexion= () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  return (
    <div className="form-container">
      {/* Partie gauche */}
      <div className="form-left">
        <div className="form-title">KeyChoose</div>

        <div className="form-section">
          <h1 className="form-heading">Connexion</h1>

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
              />
            </div>

            {/* Champ mot de passe */}
            <div className="password-group">
              <input
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="Mot de passe"
                className="password-field"
              />
            </div>

            {/* Bouton */}
            <button className="submit-button" type="submit">
              Connexion
            </button>

            {/* Séparateur */}
            <div className="separator">
              <div className="separator-line" />
              <span className="separator-text">ou</span>
              <div className="separator-line" />
            </div>
          </div>

          {/* Lien de inscription */}
          <p className="login-text">
            Pas de compte ?{" "}
            <Link to="/inscription" className="login-link">
              Créer le
            </Link>
          </p>
        </div>
      </div>

      {/* Partie droite avec image */}
      <div className="image-container">
        <div className="image-block image-left"></div>
        <div className="image-block image-right"></div>
      </div>
    </div>
  );
};
