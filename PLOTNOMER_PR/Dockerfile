FROM node:14.21.3
WORKDIR /usr/src/app 
COPY package*.json ./
 RUN npm install
 COPY . .
 EXPOSE 8080
CMD ["npm", "start"]