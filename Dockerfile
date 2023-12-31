FROM node:20.10.0-alpine

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json /tmp/app/
RUN cd /tmp/app && npm install

COPY . /usr/src/app

WORKDIR /usr/src/app
RUN if [ ! -f .env ]; then cp .env.example .env; fi
RUN npm run build

CMD ["/opt/startup.dev.sh"]
