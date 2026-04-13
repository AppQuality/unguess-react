ARG STAGE_ENV

FROM node:24-alpine as base

ARG STAGE_ENV
ARG STRAPI_TOKEN

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN ["npm", "ci", "--ignore-scripts"]
RUN rm -f .npmrc

COPY . .

# Create .env.local with values from appropriate .env file and STRAPI_TOKEN
RUN if [ "$STAGE_ENV" = "production" ]; then \
      cat .env.production > .env.local; \
    else \
      cat .env.development > .env.local; \
    fi && \
    echo REACT_APP_STRAPI_API_TOKEN=${STRAPI_TOKEN} >> .env.local
ENV PUBLIC_URL=/
RUN npm run build -- --mode ${STAGE_ENV}


FROM alpine:3.22 as web
COPY --from=base /app/build /build
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN apk add nginx
COPY nginx.config /etc/nginx/http.d/default.conf
CMD /docker-entrypoint.sh
