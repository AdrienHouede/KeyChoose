import React from "react";

export const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <p>
        KeyChoose est un projet étudiant réalisé dans le cadre d’un master en développement web. 
        Il vise à proposer une sélection personnalisée de claviers externes pour tous les profils : gaming, bureautique, ou encore ergonomie.
      </p>
      <p>
        Pour toute question, suggestion ou demande de collaboration, vous pouvez nous écrire à :
      </p>
      <p className="contact-email">
        <a href="mailto:keychoose.projet@gmail.com">contact@keychoose.com</a>
      </p>
    </div>
  );
};
