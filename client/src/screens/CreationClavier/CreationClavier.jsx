import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Keyboard from '../../components/Keyboard.jsx';
import FormKeyboard from "../../components/FormKeyboard.jsx";

export const CreationClavier = () => {
  const [layoutType, setLayoutType] = useState('azerty'); // qwerty, azerty, bepo
  const [format, setFormat] = useState('ISO');            // ISO, ANSI
  const [material, setMaterial] = useState('aluminium');  // plastique, bois, aluminium
  const [size, setSize] = useState(80);                   // taille en %

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const body = {
        type: layoutType.toUpperCase(),
        layout: format,
        size,
        switch: "",
        connectivity: "",
        rgb: 0,
        material: material.toUpperCase(),
        price: 1
      };
      const res = await fetch('http://localhost:3000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur création profile');
      // rediriger vers la page profile ou home
      navigate(`/profil`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const layout = `${layoutType}_${format.toLowerCase()}`;

  return (
    <div className='containerKeyboard'>
      <div className="logo-container titleClavier">
        <Link to="/home">
          <img
            src="https://c.animaapp.com/mdeaibpn2YVHFn/img/image-5.png"
            alt="Logo"
            className="logo-image"
          />
        </Link>
        <h1 className="title">Votre nouveau clavier</h1>
      </div>

      <Keyboard layout={layout} material={material} format={format} size={size} />

      {/* Formulaire de sélection */}
      <FormKeyboard
        layoutType={layoutType}
        setLayoutType={setLayoutType}
        format={format}
        setFormat={setFormat}
        material={material}
        setMaterial={setMaterial}
        size={size}
        setSize={setSize}
      />

      {/* Bouton envoyer vers API */}
      <div className="create-button-container">
        {error && <p className="error-message">{error}</p>}
        <button
          className="submit-button"
          disabled={loading}
          onClick={handleCreate}
        >
          {loading ? 'Création...' : 'Créer le clavier'}
        </button>
      </div>
    </div>
  );
};