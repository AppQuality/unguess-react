FROM alpine:3.14 as base

RUN apk add nodejs npm
ARG NPM_TOKEN  
RUN echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc
COPY package*.json ./
RUN npm install
RUN rm -f .npmrc

COPY . .

RUN npm run build

FROM alpine:3.14 as web

COPY --from=base /build /build
RUN apk add nginx
COPY nginx.config /etc/nginx/http.d/default.conf
CMD nginx -g 'daemon off;'
