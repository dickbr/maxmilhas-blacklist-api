FROM node:alpine as release

ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --omit=dev

COPY . .

COPY .env .

EXPOSE  3001

CMD [ "npm", "start" ]