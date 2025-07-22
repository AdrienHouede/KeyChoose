# 1. Image de base
FROM node:22

# 2. Dossier de travail dans le conteneur
WORKDIR /app

# 3. Copie des fichiers de dépendances et installation
COPY package*.json ./
RUN npm install
# Installation de nodemon pour le mode dev
RUN npm install --save-dev nodemon

# 4. Copie du reste du code de l'API
COPY . .

# 5. Exposition du port sur lequel tourne ton API
EXPOSE 3000

# 6. Commande de démarrage en mode développement (watch)
CMD ["npm", "run", "start"]