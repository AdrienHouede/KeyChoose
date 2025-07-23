import React from "react";

const GuideUtilisateur = () => {
  return (
    <div className="page-container">
      <h2>Guide Utilisateur</h2>
      <p>Ce guide vous accompagne dans l’utilisation de la plateforme KeyChoose :</p>
      <ol>
        <li>Créez un compte via la page d’inscription.</li>
        <li>Accédez à votre espace personnel pour configurer votre profil.</li>
        <li>Utilisez le configurateur pour choisir un clavier selon vos critères.</li>
        <li>Enregistrez ou partagez vos recommandations.</li>
      </ol>

      <h3>FAQ</h3>
      <p><strong>🟢 Est-ce que KeyChoose est gratuit ?</strong><br />
      Oui, l’utilisation de la plateforme est totalement gratuite.</p>

      <p><strong>🔐 Mes données sont-elles sécurisées ?</strong><br />
      Oui, nous respectons les bonnes pratiques RGPD, et vos données ne sont jamais revendues.</p>

      <p><strong>📩 Puis-je contacter le support ?</strong><br />
      Bien sûr ! Utilisez la page de contact pour toute question ou souci.</p>
    </div>
  );
};

export default GuideUtilisateur;
