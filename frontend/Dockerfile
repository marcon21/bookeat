FROM node
RUN mkdir /opt/frontend
WORKDIR /opt/frontend
COPY ./package.json ./
RUN npm install

# During Development
CMD npm run dev

# For production
# CMD npm start