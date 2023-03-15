FROM node:12.16.3-stretch
RUN mkdir /opt/backend
WORKDIR /opt/backend
COPY ./package.json ./
RUN npm install
RUN npm install -g nodemon

# During Development
CMD npm run dev

# For production
# CMD npm start
