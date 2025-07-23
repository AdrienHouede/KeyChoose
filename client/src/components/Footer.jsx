import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/cgu">Conditions Générales d’Utilisation</Link> |{" "}
        <Link to="/mentions-legales">Mentions Légales</Link> |{" "}
        <Link to="/guide-utilisateur">Guide Utilisateur & FAQ</Link>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} KeyChoose. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
