import React from 'react';
import azerty from '../layouts/azerty';
import qwerty from '../layouts/qwerty';
import bepo from '../layouts/bepo';

const layouts = {
  azerty,
  qwerty,
  bepo
};

function Keyboard({ layout = 'azerty', format = 'ISO', size = 100, material }) {
  const layoutData = layouts[layout.toLowerCase()] || [];

  const handleKeyClick = (key) => {
    console.log(`Touche cliquée : ${key}`);
  };

  return (
    <div
      className={`keyboard keyboard-${material}`}
      style={{ transform: `scale(${size / 100})`, transformOrigin: 'top center' }}
    >
      {layoutData.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const isEnter = key.key.toLowerCase() === 'enter';
            const enterClass = isEnter ? (format === 'ISO' ? 'enter-iso' : 'enter-ansi') : '';

            return (
              <button
                key={key.key}
                className={`key ${key.className || ''} ${enterClass}`}
                onClick={() => handleKeyClick(key.key)}
              >
                {key.label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
