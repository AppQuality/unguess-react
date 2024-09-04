ARG STAGE_ENV

FROM node:18.20-alpine3.19 as base

ARG STRAPI_TOKEN
ARG SENTRY_AUTH_TOKEN


COPY package.json ./
COPY yarn.lock ./
RUN ["yarn", "install", "--frozen-lockfile", "--ignore-scripts"]
RUN rm -f .npmrc

COPY . .

RUN echo REACT_APP_STRAPI_API_TOKEN=${STRAPI_TOKEN} > .env.local

RUN ["yarn", "build"]
RUN ["yarn", "sentry:sourcemaps"]


FROM alpine:3.14 as web
COPY --from=base /build /build
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN apk add nginx
COPY nginx.config /etc/nginx/http.d/default.conf
CMD /docker-entrypoint.sh
