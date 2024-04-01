FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install && npm install typescript -g
COPY . .
ENV PORT 3000
EXPOSE ${PORT}
RUN tsc
CMD [ "npm", "start" ]