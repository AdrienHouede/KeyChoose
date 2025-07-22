import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Keyboard from './components/Keyboard';
import FormKeyboard from "./components/FormKeyboard.jsx";
import { FormulaireInscription } from "./screens/FormulaireInscription";
import { FormulaireConnexion } from "./screens/FormulaireConnexion";
import { Navigate } from 'react-router-dom';

function ClavierPage() {
  const [layoutType, setLayoutType] = useState('azerty'); // qwerty, azerty, bepo
  const [format, setFormat] = useState('ISO');            // ISO, ANSI
  const [material, setMaterial] = useState('aluminium');
  const [size, setSize] = useState(80);

  const layout = `${layoutType}_${format.toLowerCase()}`;

  return (
    <div style={{ padding: '2rem' }}>
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
      <Keyboard
        layout={layout}
        material={material}
        format={format}
        size={size}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/clavier" />} />
        <Route path="/clavier" element={<ClavierPage />} />
        <Route path="/inscription" element={<FormulaireInscription />} />
        <Route path="/connexion" element={<FormulaireConnexion />} />
      </Routes>
    </Router>
  );
}

export default App;
