import React from 'react';

function FormKeyboard({ layoutType, setLayoutType, format, setFormat, material, setMaterial, size, setSize }) {
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
        <legend><strong>Taille</strong></legend>
        <input
          type="range"
          min="50"
          max="150"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
        />
        <span>{size}%</span>
      </fieldset>
    </form>
  );
}

export default FormKeyboard;
