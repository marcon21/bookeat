FROM node:12.16.3-stretch
RUN mkdir /opt/backend
WORKDIR /opt/backend
RUN npm install -g nodemon
COPY ./package.json ./
RUN npm install

# During Development
CMD npm run dev

# For production
# CMD npm start
