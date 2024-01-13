FROM node:14-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
# RUN npm test
EXPOSE 3001
RUN chown -R node /usr/src/app
USER node
# Start the app
CMD ["node", "src/app.js"]