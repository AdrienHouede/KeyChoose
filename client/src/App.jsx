import React, { useState } from 'react';
import Keyboard from './components/Keyboard';
import FormKeyboard from './components/formKeyboard';

function App() {
  const [layoutType, setLayoutType] = useState('azerty'); // qwerty, azerty, bepo
  const [format, setFormat] = useState('ISO');            // ISO, ANSI
  const [material, setMaterial] = useState('aluminium');
  const [size, setSize] = useState(80);

  // On déduit le layout à utiliser dynamiquement
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

export default App;
