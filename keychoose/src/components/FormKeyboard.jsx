import React from 'react';

const FormKeyboard = ({ layout, setLayout, material, setMaterial, format, setFormat, size, setSize }) => {
  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Choix du clavier</h2>

      <div>
        <label>
          <input
            type="radio"
            name="layout"
            value="qwerty"
            checked={layout === 'qwerty'}
            onChange={e => setLayout(e.target.value)}
          />
          QWERTY
        </label><br />
        <label>
          <input
            type="radio"
            name="layout"
            value="azerty"
            checked={layout === 'azerty'}
            onChange={e => setLayout(e.target.value)}
          />
          AZERTY
        </label><br />
        <label>
          <input
            type="radio"
            name="layout"
            value="bepo"
            checked={layout === 'bepo'}
            onChange={e => setLayout(e.target.value)}
          />
          BEPO
        </label>
      </div>

      {/* Matériaux */}
      <div style={{ marginTop: 20 }}>
        <label>
          <input
            type="radio"
            name="material"
            value="aluminium"
            checked={material === 'aluminium'}
            onChange={e => setMaterial(e.target.value)}
          />
          Aluminium
        </label><br />
        <label>
          <input
            type="radio"
            name="material"
            value="bois"
            checked={material === 'bois'}
            onChange={e => setMaterial(e.target.value)}
          />
          Bois
        </label><br />
        <label>
          <input
            type="radio"
            name="material"
            value="plastique"
            checked={material === 'plastique'}
            onChange={e => setMaterial(e.target.value)}
          />
          Plastique
        </label>
      </div>

      {/* Format */}
      <div style={{ marginTop: 20 }}>
        <label>
          <input
            type="radio"
            name="format"
            value="ISO"
            checked={format === 'ISO'}
            onChange={e => setFormat(e.target.value)}
          />
          ISO
        </label><br />
        <label>
          <input
            type="radio"
            name="format"
            value="ANSI"
            checked={format === 'ANSI'}
            onChange={e => setFormat(e.target.value)}
          />
          ANSI
        </label>
      </div>

      {/* Taille */}
      <div style={{ marginTop: 20 }}>
        <label>
          Taille : {size} %
          <input
            type="range"
            min="40"
            max="100"
            value={size}
            onChange={e => setSize(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </label>
      </div>
    </div>
  );
};

export default FormKeyboard;
