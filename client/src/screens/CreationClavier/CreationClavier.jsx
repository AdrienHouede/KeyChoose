import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Keyboard from '../../components/Keyboard.jsx';
import FormKeyboard from "../../components/FormKeyboard.jsx";

export const CreationClavier = () => {
    const [layoutType, setLayoutType] = useState('azerty'); // qwerty, azerty, bepo
  const [format, setFormat] = useState('ISO');            // ISO, ANSI
  const [material, setMaterial] = useState('aluminium');
  const [size, setSize] = useState(80);

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
      <Keyboard
        layout={layout}
        material={material}
        format={format}
        size={size}
      />
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
    </div>
  );
}