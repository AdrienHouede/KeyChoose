import React from "react";

function FormKeyboard({ layoutType, setLayoutType, format, setFormat, material, setMaterial, size, setSize }) {
  const handleSizeChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setSize(val < 90 ? 80 : 100);
  };

  return (
    <form className="keyboard-form">
      <fieldset>
        <legend>Disposition</legend>
        <div className="option-group">
          {["azerty", "qwerty", "bepo"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="layout"
                value={type}
                checked={layoutType === type}
                onChange={(e) => setLayoutType(e.target.value)}
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Format</legend>
        <div className="option-group">
          {["ISO", "ANSI"].map((f) => (
            <label key={f}>
              <input
                type="radio"
                name="format"
                value={f}
                checked={format === f}
                onChange={(e) => setFormat(e.target.value)}
              />
              {f}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Matériau</legend>
        <select value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="plastique">Plastique</option>
          <option value="bois">Bois</option>
          <option value="aluminium">Aluminium</option>
        </select>
      </fieldset>

      <fieldset>
        <legend>Taille du clavier</legend>
        <input
          type="range"
          min="80"
          max="100"
          step="20"
          value={size}
          onChange={handleSizeChange}
        />
        <span className="size-label">
          {size === 100
            ? "Taille standard (avec pavé numérique)"
            : "Taille compacte (sans pavé numérique)"}
        </span>
      </fieldset>
    </form>
  );
}

export default FormKeyboard;
