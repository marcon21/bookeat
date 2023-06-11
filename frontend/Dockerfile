# FROM node
FROM node:alpine as frontend-build
RUN mkdir /opt/frontend
WORKDIR /opt/frontend
COPY ./package.json ./
RUN npm install
# During Development
# CMD npm run dev
# For production
CMD npm run build


FROM nginx:alpine

COPY --from=frontend-build /opt/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]