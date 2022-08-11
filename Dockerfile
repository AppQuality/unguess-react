FROM alpine:3.14 as base

RUN apk add nodejs yarn

ARG STRAPI_TOKEN
ARG STAGE_ENV

COPY package.json ./
COPY yarn.lock ./
RUN ["yarn", "install"]
RUN rm -f .npmrc

COPY . .

RUN if [[ "$STAGE_ENV" = 'development']] ; then cp .env.development .env.local ; fi

RUN printf '\nREACT_APP_STRAPI_API_TOKEN=${STRAPI_TOKEN}\n' >> .env

RUN ["yarn", "build"]

FROM alpine:3.14 as web

COPY --from=base /build /build
RUN apk add nginx
COPY nginx.config /etc/nginx/http.d/default.conf
CMD nginx -g 'daemon off;'
