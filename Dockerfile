FROM node:19-slim as development

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install --only=development

COPY . .

CMD ["npm", "run", "start:db"]