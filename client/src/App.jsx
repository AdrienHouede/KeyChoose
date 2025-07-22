import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Keyboard from './components/Keyboard';
import Header from './components/Header';
import FormKeyboard from "./components/FormKeyboard.jsx";
import { FormulaireInscription } from "./screens/FormulaireInscription";
import { FormulaireConnexion } from "./screens/FormulaireConnexion";
import { Navigate } from 'react-router-dom';
import { Profil } from "./screens/Profil";
import { Description } from "./screens/Description";
import { Contact } from "./screens/Contact";

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

function AppContent() {
  const location = useLocation();
  const hideHeaderRoutes = ['/inscription', '/connexion'];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/profil" />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/clavier" element={<ClavierPage />} />
        <Route path="/inscription" element={<FormulaireInscription />} />
        <Route path="/connexion" element={<FormulaireConnexion />} />
        <Route path="/recommandation/:id" element={<Description />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
