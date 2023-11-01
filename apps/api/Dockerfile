FROM lskjs/node:20.2.0-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG VERSION=unknown
ENV VERSION=${VERSION}

WORKDIR /app
COPY ./.release /app

CMD npm start
