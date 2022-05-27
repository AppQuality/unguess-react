FROM alpine:3.14 as base

RUN apk add nodejs yarn

ARG STRAPI_TOKEN

COPY package.json ./
COPY yarn.lock ./
RUN ["yarn", "install"]
RUN rm -f .npmrc

RUN echo REACT_APP_DEFAULT_TOKEN=${STRAPI_TOKEN} > .env

COPY . .

RUN ["yarn", "build"]

FROM alpine:3.14 as web

COPY --from=base /build /build
RUN apk add nginx
COPY nginx.config /etc/nginx/http.d/default.conf
CMD nginx -g 'daemon off;'
