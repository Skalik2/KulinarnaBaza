FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install \
&& npm install typescript -g && npm install -g db-migrate && npm install db-migrate-pg

#ENV PORT 5000

EXPOSE 5000:5000

CMD [ "npm", "run", "dev" ]
