import React from "react";

function FormKeyboard({ layoutType, setLayoutType, format, setFormat, material, setMaterial, size, setSize }) {
  return (
    <form className="form-keyboard">
      {/* Disposition */}
      <div className="field-group">
        <span className="legend">Disposition</span>
        <div className="options layout-options">
          {['qwerty', 'azerty', 'bepo'].map((key) => (
            <label key={key} className={`option ${layoutType === key ? 'active' : ''}`}>
              <input
                type="radio"
                name="layout"
                value={key}
                checked={layoutType === key}
                onChange={() => setLayoutType(key)}
              />
              <span className="option-label">{key.toUpperCase()}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Matériau */}
      <div className="field-group">
        <span className="legend">Matériau</span>
        <div className="options material-options">
          {['aluminium', 'bois', 'plastique'].map((key) => (
            <label key={key} className={`option ${material === key ? 'active' : ''}`}>
              <input
                type="radio"
                name="material"
                value={key}
                checked={material === key}
                onChange={() => setMaterial(key)}
              />
              <span className="option-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Format */}
      <div className="field-group">
        <span className="legend">Format</span>
        <div className="options format-options">
          {['ISO', 'ANSI'].map((f) => (
            <label key={f} className={`option ${format === f ? 'active' : ''}`}>
              <input
                type="radio"
                name="format"
                value={f}
                checked={format === f}
                onChange={() => setFormat(f)}
              />
              <span className="option-label">{f}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Taille du clavier */}
      <div className="field-group">
        <span className="legend">Taille du clavier</span>
        <div className="slider-wrapper">
          <input
            type="range"
            min="80"
            max="100"
            step="20"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value, 10))}
            className="styled-range"
          />
          <div className="marks">
            <span>80%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormKeyboard;