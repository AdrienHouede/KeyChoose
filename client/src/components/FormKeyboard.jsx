import React from 'react';

function FormKeyboard({ layoutType, setLayoutType, format, setFormat, material, setMaterial, size, setSize }) {
  const handleSizeChange = (e) => {
    const val = parseInt(e.target.value, 10);
    // Force à 80 ou 100 uniquement
    if (val < 90) {
      setSize(80);
    } else {
      setSize(100);
    }
  };

  return (
    <form style={{ marginBottom: '2rem' }}>
      <fieldset>
        <legend><strong>Disposition</strong></legend>
        <label>
          <input
            type="radio"
            name="layout"
            value="azerty"
            checked={layoutType === 'azerty'}
            onChange={(e) => setLayoutType(e.target.value)}
          /> Azerty
        </label>
        <label>
          <input
            type="radio"
            name="layout"
            value="qwerty"
            checked={layoutType === 'qwerty'}
            onChange={(e) => setLayoutType(e.target.value)}
          /> Qwerty
        </label>
        <label>
          <input
            type="radio"
            name="layout"
            value="bepo"
            checked={layoutType === 'bepo'}
            onChange={(e) => setLayoutType(e.target.value)}
          /> Bepo
        </label>
      </fieldset>

      <fieldset>
        <legend><strong>Format</strong></legend>
        <label>
          <input
            type="radio"
            name="format"
            value="ISO"
            checked={format === 'ISO'}
            onChange={(e) => setFormat(e.target.value)}
          /> ISO
        </label>
        <label>
          <input
            type="radio"
            name="format"
            value="ANSI"
            checked={format === 'ANSI'}
            onChange={(e) => setFormat(e.target.value)}
          /> ANSI
        </label>
      </fieldset>

      <fieldset>
        <legend><strong>Matériau</strong></legend>
        <select value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="plastique">Plastique</option>
          <option value="bois">Bois</option>
          <option value="aluminium">Aluminium</option>
        </select>
      </fieldset>

      <fieldset>
        <legend><strong>Taille du clavier</strong></legend>
        <input
          type="range"
          min="80"
          max="100"
          step="20"
          value={size}
          onChange={handleSizeChange}
        />
        <span>
          {size === 100
            ? 'Taille standard (avec pavé numérique)'
            : 'Taille compacte (sans pavé numérique)'}
        </span>
      </fieldset>
    </form>
  );
}

export default FormKeyboard;
