FROM node:16-alpine3.11

RUN mkdir -p /code/
WORKDIR /code/

COPY package*.json .
RUN npm ci

EXPOSE 4200
CMD [ "npm", "run", "start:docker" ]
