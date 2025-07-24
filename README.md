# KeyChoose

## Description
KeyChoose est une plateforme web et mobile pour recommander des claviers externes selon vos préférences techniques (type, layout, matériau, switch, taille), avec une modélisation CSS interactive.

## Fonctionnalités principales
- Inscription & connexion sécurisées (email, mot de passe haché)  
- Gestion des profils utilisateurs (préférences clavier)  
- Filtrage dynamique et recommandations personnalisées  
- Modélisation en temps réel du clavier en CSS  
- Interface admin pour gestion des claviers et consultation des logs  
- Documentation Swagger intégrée (`/docs`)

## Stack technique
- **Front-End** : React.js, CSS avancé, ARIA  
- **Back-End** : Node.js (Express) ou Django  
- **Base de données** : PostgreSQL ou MySQL  
- **Authentification** : JWT, hachage SHA-256/bcrypt  
- **Tests** : Jest/Mocha (unitaires), Cypress/Puppeteer (fonctionnels)  
- **CI/CD & Déploiement** : GitHub Actions, cloud provider (AWS/GCP/Azure)

## Installation
1. Cloner le dépôt  
   ```bash
   git clone https://github.com/AdrienHouede/KeyChoose.git
   cd keychoose
   ```
2. Configurer les variables d’environnement  
   ```env
   API_PORT=3000
   CLIENT_PORT=5173
   MYSQL_PORT=3306

   JWT_SECRET=Jdne67vb67tfgYVYTF
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_ROOT_PASSWORD=
   MYSQL_PASSWORD=
   MYSQL_DATABASE=keychoose

   SMTP_HOST=stmp.example.com
   SMTP_PORT=465
   SMTP_USER=no-reply@example.com
   SMTP_PASS=
   ```
3. Installer les dépendances  
   ```bash
   cd api && npm install
   cd client && npm install
   ```
4. Lancer la base de données  
   ```bash
   docker-compose up --build -d
   ```
5. Démarrer l’application  
   - Accéder au projet via http://localhost:{CLIENT_PORT}

## Usage
- Accéder à l’UI : `http://localhost:{CLIENT_PORT}`  
- Documentation API : `http://localhost:{API_PORT}/docs`

## API Reference
### Authentification
- **POST /api/auth/register** – S’inscrire  
- **POST /api/auth/login** – Se connecter  
- **POST /api/password/forgot** – Demander reset  
- **POST /api/password/reset** – Réinitialiser mot de passe

### Profils & recommandations
- **POST /api/profile** – Créer un profil  
- **GET /api/recommendation/:id** – Obtenir recommandations

### Claviers
- **GET /api/keyboards** – Lister  
- **POST /api/keyboards** – Ajouter  
- **DELETE /api/keyboards/:id** – Supprimer

### Administration
- **POST /api/admin/keyboards** – Ajout (admin)  
- **GET /api/admin/logs** – Journaux (admin)

## Tests
```bash
# API
cd api && npm test
```

## RGPD et confidentialité

### Données collectées

* **Email** et **mot de passe** (haché) pour l'authentification
* **Profil utilisateur** : identifiants de préférences (attribute\_Id)
* **Logs** : actions réalisées (création/suppression de clavier, authentification)

### Finalités du traitement

* Fournir un service d'authentification et de gestion de compte
* Personnaliser les recommandations de produits
* Sécuriser et tracer les opérations critiques via la table `LOGS`
* Permettre la réinitialisation du mot de passe via tokens

### Base légale

* **Consentement** de l'utilisateur lors de la création de son compte
* **Exécution d'un contrat** (provision de service de recommandation)
* **Obligations légales** (conservation de logs en cas de litige)

### Durée de conservation

* **Données d'authentification** : conservées tant que le compte est actif ou jusqu'à suppression par l'utilisateur
* **Logs** : conservés pendant 1 an, puis anonymisés
* **Tokens de réinitialisation** : valides 1 heure, puis supprimés

### Sécurité des données

* Stockage des mots de passe avec **bcrypt** (salt, rounds)
* Transmission via **HTTPS** (à configurer en production)
* Limitation des accès aux endpoints via **JWT**
* Journalisation des actions critiques dans la table `LOGS`

### Droits des utilisateurs

Conformément au RGPD, chaque utilisateur dispose des droits suivants :

* **Droit d'accès** : obtenir une copie des données personnelles
* **Droit de rectification** : corriger toute information inexacte
* **Droit à l'effacement** : demander la suppression de son compte et de ses données
* **Droit à la portabilité** : recevoir ses données dans un format structuré
* **Droit d'opposition** : s'opposer au traitement de ses données

Pour exercer ses droits, l'utilisateur peut envoyer une demande à :`rgpd@keychoose.com`.

### Contact

Pour toute question relative à la confidentialité et au RGPD, contactez :
**Responsable des données**
Email : [rgpd@keychoose.com](mailto:rgpd@keychoose.com)
Téléphone : +33 1 23 45 67 89

## License
MIT © HOUEDE Adrien & BIZET Thomas