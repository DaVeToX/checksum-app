FROM node:14-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install 
RUN npm install body-parser

RUN chown -R node /usr/src/app
# Run the application as a non-root user.
USER node

# Copy the rest of the application's source code.
COPY . .

# expose port 3000 which the app listens on
EXPOSE 3000

# Run the app.
CMD node src/app.js