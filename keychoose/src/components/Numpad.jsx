// components/Numpad.jsx

import React from 'react';
import numpad from '../layouts/numpad';
import './pave.css';

function Numpad({ onKeyClick }) {
  return (
    <div className="numpad">
      {numpad.map((row, rowIndex) => (
        <div key={rowIndex} className="numpad-row">
          {row.map((key) => (
            <button
              key={key.key}
              className={`key ${key.className || ''}`}
              onClick={() => onKeyClick?.(key.key)}
            >
              {key.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Numpad;
