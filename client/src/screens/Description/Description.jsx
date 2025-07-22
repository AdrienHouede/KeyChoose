import React from "react";
import illustration from "../../image/png/illustration_clavier.png"

export const Description = () => {
  return (
    <div className="description-container">
      <div className="profil-header">
        <img
          src="https://c.animaapp.com/mdeaibpn2YVHFn/img/image-5.png"
          alt="icon profil"
          className="profil-icon"
        />
        <h1>Profil gaming</h1>
      </div>

      <div className="keyboard-preview">
        <img
          src={illustration}
          alt="clavier illustration"
          className="keyboard-img"
        />
        <div className="keyboard-info">
          <span className="layout-label">QWERTY</span>
          <span className="layout-type">ANSI</span>
          <span className="material">Aluminum</span>
          <span className="keyboard-size">100 %</span>
        </div>
      </div>

      <div className="navigation-arrows">
        <span className="arrow">&lt;</span>
        <span className="arrow">&gt;</span>
      </div>

      <div className="product-grid">
        <div className="product-card">
          <img
            src="https://c.animaapp.com/mdeaibpn2YVHFn/img/image--2--1.png"
            alt="Asus ROG"
          />
          <h2>Asus ROG Strix Scope II 96 Wireless</h2>
          <p>
            Type : Qwerty<br />
            Layout : ANSI<br />
            Taille : 100%<br />
            Matériau : Alu
          </p>
          <div className="compatibility">Compatible : 100 %</div>
          <button className="buy-button">Acheter</button>
        </div>

        <div className="product-card">
          <img
            src="https://c.animaapp.com/mdeaibpn2YVHFn/img/image--3--1.png"
            alt="Gamakay NS68"
          />
          <h2>Gamakay x NaughShark NS68</h2>
          <p>
            Type : Qwerty<br />
            Layout : ANSI<br />
            Taille : 75%<br />
            Matériau : Plastique
          </p>
          <div className="compatibility">Compatible : 50 %</div>
          <button className="buy-button">Acheter</button>
        </div>

        <div className="product-card">
          <img
            src="https://c.animaapp.com/mdeaibpn2YVHFn/img/image--4--1.png"
            alt="Ducky Zero 6108"
          />
          <h2>Ducky Zero 6108</h2>
          <p>
            Type : Qwerty<br />
            Layout : ISO<br />
            Taille : 100%<br />
            Matériau : Plastique
          </p>
          <div className="compatibility">Compatible : 50 %</div>
          <button className="buy-button">Acheter</button>
        </div>
      </div>
    </div>
  );
};
