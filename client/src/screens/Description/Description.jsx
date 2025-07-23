import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import illustration from "../../image/png/illustration_clavier.png";
import Keyboard from "../../components/Keyboard";

export const Description = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [recs, setRecs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecLoading, setIsRecLoading] = useState(true);
  const [error, setError] = useState("");
  const [recError, setRecError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/profile/${id}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
          }
        });
        if (res.status === 401 || res.status === 403) {
          navigate("/");
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur récupération du profil");
        const prof = Array.isArray(data)
          ? data[0]
          : data.profiles
          ? data.profiles[0]
          : data;
        setProfile(prof);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [id, navigate]);

  useEffect(() => {
    if (!profile) return;
    const fetchRecs = async () => {
      setIsRecLoading(true);
      setRecError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/recommendation/${id}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
          }
        });
        if (res.status === 401 || res.status === 403) {
          navigate("/");
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur récupération recommandations");
        setRecs(data);
      } catch (err) {
        setRecError(err.message);
      } finally {
        setIsRecLoading(false);
      }
    };
    fetchRecs();
  }, [profile, navigate]);

  if (isLoading) return <p className="loading-text">Chargement du profil...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!profile) return <p>Aucun profil trouvé.</p>;

  return (
    <div className="description-container">
      <div className="profil-header">
        <img
          src="https://c.animaapp.com/mdeaibpn2YVHFn/img/image-5.png"
          alt="icon profil"
          className="profil-icon"
        />
        <h1>{profile.name || `Profil ${profile.id}`}</h1>
      </div>

      <div className="keyboard-preview">
        <Keyboard
          layout={`${profile.type}_${profile.layout}`.toLowerCase()}
          material={profile.material.toLowerCase()}
          format={profile.layout}
          size={profile.size}
        />
        <div className="keyboard-info">
          <span className="layout-label">{profile.type}</span>
          <span className="layout-type">{profile.layout}</span>
          <span className="material">{profile.material}</span>
          <span className="keyboard-size">{profile.size}%</span>
        </div>
      </div>

      <section className="recommendations">
        {isRecLoading && <p className="loading-text">Chargement des recommandations...</p>}
        {recError && <p className="error-message">{recError}</p>}
        {!isRecLoading && !recError && (
          <div className="product-grid">
            {recs.length > 0
              ? recs.map((item) => (
                  <div key={item.id} className="product-card">
                    <img src={item.image || illustration} alt={item.nom} />
                    <h2>{item.nom}</h2>
                    <p>
                      Type : {item.type}
                      <br />
                      Layout : {item.layout}
                      <br />
                      Taille : {item.size}%
                      <br />
                      Matériau : {item.material}
                    </p>
                    <div className="compatibility">
                      Compatible : {item.compatibilityScore} %
                    </div>
                    <button
                      className="buy-button"
                      onClick={() => window.open(item.url, '_blank')}
                    >
                      Acheter
                    </button>
                  </div>
                ))
              : <p>Aucune recommandation.</p>}
          </div>
        )}
      </section>
    </div>
  );
};