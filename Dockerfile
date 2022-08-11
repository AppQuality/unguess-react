ARG STAGE_ENV

FROM alpine:3.14 as base

ARG STRAPI_TOKEN

RUN apk add nodejs yarn

COPY package.json ./
COPY yarn.lock ./
RUN ["yarn", "install"]
RUN rm -f .npmrc

COPY . .

RUN echo $STRAPI_TOKEN

RUN echo REACT_APP_STRAPI_API_TOKEN=${STRAPI_TOKEN} > .env.local

FROM base as app-production
RUN echo "prepare production build..."

FROM base as app-development
RUN echo "prepare development build..."
RUN cat .env.development >> .env.local

FROM app-${STAGE_ENV} as final
RUN echo 'building react...'
RUN ["yarn", "build"]


FROM alpine:3.14 as web
COPY --from=final /build /build
RUN apk add nginx
RUN ls -la 
COPY nginx.config /etc/nginx/http.d/default.conf
CMD nginx -g 'daemon off;'
