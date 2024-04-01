FROM node:15

WORKDIR /app

COPY package.json .

RUN npm install \
&& npm install typescript -g

COPY . .

ENV PORT 5000

EXPOSE ${PORT}

CMD [ "npm", "run", "dev" ]
