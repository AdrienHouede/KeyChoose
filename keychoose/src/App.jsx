import React, { useState } from 'react';
import Keyboard from './components/Keyboard';
import FormKeyboard from './components/formKeyboard';

function App() {
  // États partagés
  const [layout, setLayout] = useState('azerty');
  const [material, setMaterial] = useState('aluminium');
  const [format, setFormat] = useState('ISO');
  const [size, setSize] = useState(80);

  return (
    <div style={{ padding: '2rem' }}>
      {/* Formulaire reçoit les valeurs et des callbacks pour modifier */}
      <FormKeyboard
        layout={layout}
        setLayout={setLayout}
        material={material}
        setMaterial={setMaterial}
        format={format}
        setFormat={setFormat}
        size={size}
        setSize={setSize}
      />

      {/* Clavier reçoit les valeurs pour l'affichage */}
      <Keyboard
        layout={layout}
        material={material}
        format={format}
        size={size}
      />
    </div>
  );
}

export default App;
