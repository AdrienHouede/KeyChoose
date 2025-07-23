import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/connexion');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/profil">
          <img
            src="https://c.animaapp.com/mdeaibpn2YVHFn/img/image-5.png"
            alt="Logo"
            className="logo-image"
          />
        </Link>
        <h1 className="title">KeyChoose</h1>
      </div>

      <nav className="nav-links">
        <Link to="/clavier">Nouveau clavier</Link> |{" "}
        <Link to="/profil">Profil</Link> |{" "}
        <Link to="/contact">Contact</Link>{" "}
      </nav>

      <div
        className="user-avatar-container"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <img
          src="https://www.gravatar.com/avatar?d=mp"
          alt="Utilisateur"
          className="user-avatar"
        />
        {showMenu && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Se déconnecter</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;