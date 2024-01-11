FROM node:14-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
RUN npm test
EXPOSE 3001
RUN chown -R node /usr/src/app/app
USER node
CMD ["npm", "start"]

# Starte die Anwendung
# CMD ["node", "src/app/app.js"]