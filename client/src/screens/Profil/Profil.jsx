import React, { useState, useEffect } from "react";
import "../../css/profil.css";

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
      <section className="section-profiles">
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
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <article key={profile.id} className="profile-card">
                <img
                  src={profile.imageUrl || "https://c.animaapp.com/mde8zko6OPQNr5/img/clavier-png-2.png"}
                  alt={`Clavier ${profile.name || profile.type}`}
                  className="keyboard-img"
                />
                <h3>{profile.name || `Profil ${profile.id}`}</h3>
                <p>
                  Type : {profile.type}<br />
                  Layout : {profile.layout}<br />
                  Taille : {profile.size}<br />
                  Matériau : {profile.material}
                </p>
                <button
                  className="btn"
                  onClick={() => window.location.href = `/recommandation/${profile.id}`}
                >
                  Consulter
                </button>
              </article>
            ))
          ) : (
            <p>Aucun profil disponible.</p>
          )}
        </div>
      </section>
    </main>
  );
};