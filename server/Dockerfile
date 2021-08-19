FROM node:16-alpine3.11

ENV NODE_ENV docker

RUN mkdir -p /code/
WORKDIR /code/

COPY package*.json .
RUN npm ci

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
