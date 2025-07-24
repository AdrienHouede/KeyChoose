ARG CLIENT_PORT=5173

FROM node:22

WORKDIR /app

ENV CLIENT_PORT=${CLIENT_PORT}

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${CLIENT_PORT}
CMD ["npm", "run", "dev"]