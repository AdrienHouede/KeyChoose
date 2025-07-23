import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import clavier_accueil from "../../image/png/clavier_accueil.png";
import illustration from "../../image/png/illustration_clavier.png";
import "../../css/profil.css";

export const Profil = () => {
  const navigate = useNavigate();
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
        const res = await fetch(`http://localhost:3000/api/profile/`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
          }
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Erreur récupération profils');
        }
        const list = Array.isArray(data) ? data : data.profiles || [data];
        list.sort((a, b) => new Date(b.created) - new Date(a.created));
        setProfiles(list);
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
      <section className="banner">
        <img src={clavier_accueil} alt="Clavier de fond" className="banner-img" />
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
          {profiles.map((profile) => (
            <article key={profile.profileId} className="profile-card">
              <img
                src={profile.imageUrl || illustration}
                alt={profile.type}
                className="keyboard-img"
              />
              <h3>{profile.name || `Profil ${profile.profileId}`}</h3>
              <p>
                <strong>Type</strong> : {profile.type}<br />
                <strong>Layout</strong> : {profile.layout}<br />
                <strong>Taille</strong> : {profile.size}%<br />
                <strong>Matériau</strong> : {profile.material}
              </p>
              <button
                className="btn"
                onClick={() => navigate(`/recommandation/${profile.profileId}`)}
              >
                Consulter
              </button>
            </article>
          ))}
          {profiles.length === 0 && <p>Aucun profil disponible.</p>}
        </div>
      </section>
    </main>
  );
};
