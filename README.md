## KeyChoose

KeyChoose est une application web de recommandation de claviers mécaniques, permettant aux utilisateurs de créer un compte, gérer leur profil, consulter et recommander des produits.

---

## Table des matières

1. [Fonctionnalités](#fonctionnalités)
2. [Installation](#installation)
3. [Utilisation](#utilisation)
4. [RGPD et confidentialité](#rgpd-et-confidentialité)

   1. [Données collectées](#données-collectées)
   2. [Finalités du traitement](#finalités-du-traitement)
   3. [Base légale](#base-légale)
   4. [Durée de conservation](#durée-de-conservation)
   5. [Sécurité des données](#sécurité-des-données)
   6. [Droits des utilisateurs](#droits-des-utilisateurs)
   7. [Contact](#contact)
5. [Contributeurs](#contributeurs)

---

## Fonctionnalités

* Inscription et authentification sécurisée (JWT, hachage des mots de passe)
* Gestion du profil utilisateur
* Consultation, création et suppression de claviers
* Recommandations personnalisées
* Redirections publiques via des slugs
* Interface d'administration (création de claviers, consultation des logs)

---

## Installation

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/AdrienHouede/KeyChoose
   cd KeyChoose/api
   ```
2. Installer les dépendances :

   ```bash
   npm install
   ```
3. Configurer le fichier `.env` :

   ```env
   PORT=3000
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASS=
   DB_NAME=keychoose
   JWT_SECRET=ton_secret_jwt
   ```
4. Lancer l'application en développement :

   ```bash
   npm run dev
   ```

---

## Utilisation

L'API est documentée via Swagger à l'URL : `http://localhost:3000/docs`

---

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

---

## Contributeurs

* Thomas BIZET
* Adrien HOUEDE

---