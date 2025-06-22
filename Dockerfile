FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# The application expects environment variables like DISCORD_TOKEN and MONGO_URI
CMD ["node", "app.js"]
