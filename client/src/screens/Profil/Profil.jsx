import React from "react";

export const Profil = () => {
  return (
    <main className="body">
      <section className="section-profiles">
        {/* Ajout d'une intro avec un visuel */}
        <div className="profil-intro">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2790/2790875.png"
            alt="Icône profil clavier"
            className="profil-intro-icon"
          />
          <div>
            <h1>Choisissez votre profil</h1>
            <p className="profil-intro-text">
              Chaque profil est conçu pour un usage spécifique : gaming, bureautique ou hybride.
              Explorez les configurations pour trouver le clavier qui vous correspond.
            </p>
          </div>
        </div>

        <h2 className="section-title">Profils</h2>

        <div className="profiles">
          <article className="profile-card">
            <img
              src="https://c.animaapp.com/mde8zko6OPQNr5/img/clavier-png-2.png"
              alt="Clavier gaming"
              className="keyboard-img"
            />
            <h3>Profil gaming</h3>
            <p>
              Type : Qwerty<br />
              Layout : ANSI<br />
              Taille : 100%<br />
              Matériau : Alu
            </p>
            <button className="btn">Consulter</button>
          </article>

          <article className="profile-card">
            <img
              src="https://c.animaapp.com/mde8zko6OPQNr5/img/clavier-png-2.png"
              alt="Clavier bureautique"
              className="keyboard-img"
            />
            <h3>Profil bureautique</h3>
            <p>
              Type : Azerty<br />
              Layout : ISO<br />
              Taille : 125%<br />
              Matériau : Plastique
            </p>
            <button className="btn">Consulter</button>
          </article>
        </div>
      </section>
    </main>
  );
};
