# FROM node
FROM node:alpine
RUN mkdir /opt/frontend
WORKDIR /opt/frontend
COPY ./package.json ./
RUN npm install

# RUN npm rebuild bcrypt --build-from-source

# During Development
CMD npm run dev

# For production
# CMD npm start
