import React from 'react'; 
import azerty_iso from '../layouts/azerty_iso';
import azerty_ansi from '../layouts/azerty_ansi';
import qwerty_iso from '../layouts/qwerty_iso';
import qwerty_ansi from '../layouts/qwerty_ansi';
import bepo_iso from '../layouts/bepo_iso';
import bepo_ansi from '../layouts/bepo_ansi';
import numpad from '../layouts/numpad';

const layouts = {
  azerty_iso,
  azerty_ansi,
  qwerty_iso,
  qwerty_ansi,
  bepo_iso,
  bepo_ansi
};

function Keyboard({ layout = 'azerty_iso', format = 'ISO', size = 100, material }) {
  const layoutData = layouts[layout.toLowerCase()] || [];

  const handleKeyClick = (key) => {
    console.log(`Touche cliquée : ${key}`);
  };

  return (
    <div className={`keyboard-wrapper keyboard-${material}`}>
      <div className={`keyboard`}>
        {layoutData.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key.key}
                className={`key ${key.className || ''}`}
                onClick={() => handleKeyClick(key.key)}
              >
                {key.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {size === 100 && (
        <div className="numpad">
          {numpad.map((row, rowIndex) => (
            <div key={rowIndex} className="numpad-row">
              {row.map((key) => (
                <button
                  key={key.key}
                  className={`key ${key.className || ''}`}
                  onClick={() => handleKeyClick(key.key)}
                >
                  {key.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Keyboard;
