import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
         <Link to="/home">
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
        <Link to="/description">Description</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;