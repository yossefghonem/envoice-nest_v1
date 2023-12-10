FROM denoland/deno:latest as base
WORKDIR /app
COPY ./package.json ./
# RUN apk add gcc g++ make python3
RUN npm install
# RUN apk add --update openssl && \
#     rm -rf /var/cache/apk/*

COPY . .
RUN deno cache server.ts
RUN  npm run build
CMD [ "npm", "run", "start:prod" ]

