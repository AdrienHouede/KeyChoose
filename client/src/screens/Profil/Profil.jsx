import React from "react";
import clavier_accueil from "../../image/png/clavier_accueil.png"
import illustration from "../../image/png/illustration_clavier.png"

export const Profil = () => {
  return (
    <main className="body">
      {/* Bannière avec image de fond */}
      <section className="banner">
        <img
          src={clavier_accueil} // Mets le bon chemin vers ton image
          alt="Clavier de fond"
          className="banner-img"
        />
        <div className="banner-content">
          <img
            src="https://c.animaapp.com/mdeaibpn2YVHFn/img/image-5.png"
            alt="Logo clavier"
            className="banner-icon"
          />
          <h1 className="banner-title">KeyChoose</h1>
        </div>
      </section>

      <section className="section-profiles">
        <h2 className="section-title">
          <img
            src="https://c.animaapp.com/mdeaibpn2YVHFn/img/image-5.png"
            alt="Icône profil clavier"
            className="profil-title-icon"
          />
          Profils
        </h2>

        <div className="profiles">
          <article className="profile-card">
            <img
              src={illustration}
              alt="Clavier gaming"
              className="keyboard-img"
            />
            <h3>Profil gaming</h3>
            <p>
              <strong>Type</strong> : Qwerty<br />
              <strong>Layout</strong> : ANSI<br />
              <strong>Taille</strong> : 100%<br />
              <strong>Matériau</strong> : Alu
            </p>
            <button className="btn">Consulter</button>
          </article>

          <article className="profile-card">
            <img
              src={illustration}
              alt="Clavier bureautique"
              className="keyboard-img"
            />
            <h3>Profil bureautique</h3>
            <p>
              <strong>Type</strong> : Azerty<br />
              <strong>Layout</strong> : ISO<br />
              <strong>Taille</strong> : 125%<br />
              <strong>Matériau</strong> : Plastique
            </p>
            <button className="btn">Consulter</button>
          </article>
        </div>
      </section>
    </main>
  );
};
