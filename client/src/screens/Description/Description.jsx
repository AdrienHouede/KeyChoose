import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import illustration from "../../image/png/illustration_clavier.png";
import "../../css/description.css";

export const Description = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError("");
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3000/api/profile/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
          }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erreur récupération du profil');
        // data may be object or { profiles: [...] }
        const prof = Array.isArray(data) ? data[0] : data.profiles ? data.profiles[0] : data;
        setProfile(prof);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (isLoading) return <p className="loading-text">Chargement du profil...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!profile) return <p>Aucun profil trouvé.</p>;

  return (
    <div className="description-container">
      {/* Header */}
      <div className="profil-header">
        <img
          src="https://c.animaapp.com/mdeaibpn2YVHFn/img/image-5.png"
          alt="icon profil"
          className="profil-icon"
        />
        <h1>{profile.name || `Profil ${profile.id}`}</h1>
      </div>

      {/* Preview */}
      <div className="keyboard-preview">
        <img
          src={profile.imageUrl || illustration}
          alt="clavier illustration"
          className="keyboard-img"
        />
        <div className="keyboard-info">
          <span className="layout-label">{profile.type}</span>
          <span className="layout-type">{profile.layout}</span>
          <span className="material">{profile.material}</span>
          <span className="keyboard-size">{profile.size}%</span>
        </div>
      </div>

      {/* Navigation arrows (if needed) */}
      <div className="navigation-arrows">
        <span className="arrow" onClick={() => { /* TODO: prev */ }}>&lt;</span>
        <span className="arrow" onClick={() => { /* TODO: next */ }}>&gt;</span>
      </div>

      {/* Product suggestions - static or dynamic */}
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