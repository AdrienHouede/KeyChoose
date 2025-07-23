import clavier_accueil from "../../image/png/clavier_accueil.png"
import illustration from "../../image/png/illustration_clavier.png"
import React, { useState, useEffect } from "react";

export const Profil = () => {
  // Récupérer userId depuis localStorage
  const userId = localStorage.getItem('userId');
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("Utilisateur non authentifié.");
      setIsLoading(false);
      return;
    }

    const fetchProfiles = async () => {
      setError("");
      setIsLoading(true);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/profile/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Impossible de récupérer les profils");
        }
        // Assurer un tableau de profils, même si l'API renvoie un objet unique
        let profilesData = [];
        if (Array.isArray(data)) {
          profilesData = data;
        } else if (data.profiles) {
          profilesData = data.profiles;
        } else {
          profilesData = [data];
        }
        setProfiles(profilesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [userId]);

  if (isLoading) {
    return <p className="loading-text">Chargement des profils...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <main className="body">
      {/* Bannière avec image de fond */}
      <section className="banner">
        <img
          src={clavier_accueil}
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
