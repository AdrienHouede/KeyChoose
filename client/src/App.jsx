import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header';
import { FormulaireInscription } from "./screens/FormulaireInscription";
import { FormulaireConnexion } from "./screens/FormulaireConnexion";
import { Navigate } from 'react-router-dom';
import { Profil } from "./screens/Profil";
import { Description } from "./screens/Description";
import { Contact } from "./screens/Contact";
import { CreationClavier } from './screens/CreationClavier/CreationClavier.jsx';

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
        <Route path="/clavier" element={<CreationClavier />} />
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
