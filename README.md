# UNGUESS React

Frontend web app della piattaforma UNGUESS.

## Tech Stack

React, TypeScript, Vite, Redux Toolkit, styled-components

## Setup locale

### Prerequisiti

- Node.js >= 20
- npm

### Installazione

```bash
npm ci
```

### Configurazione environment

Copia il template e personalizza i valori:

```bash
cp .env.template .env.local
```

Le variabili principali da configurare in `.env.local`:

| Variabile                    | Descrizione                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| `REACT_APP_API_URL`          | URL delle API (locale: `http://localhost:3002`, dev: `https://dev.unguess.io/api`) |
| `REACT_APP_DEFAULT_TOKEN`    | JWT token per bypassare il login in sviluppo                                       |
| `REACT_APP_STRAPI_API_TOKEN` | Token di autenticazione per le API Strapi                                          |

Le altre variabili nel template hanno gia' valori di default adatti allo sviluppo.

### Avvio

```bash
npm start
```

Apri [http://localhost:3000](http://localhost:3000).

## Script principali

| Comando                   | Descrizione                                 |
| ------------------------- | ------------------------------------------- |
| `npm start`               | Avvia il dev server Vite                    |
| `npm run build`           | Build di produzione nella cartella `build/` |
| `npm run generate-api`    | Genera i tipi TypeScript dall'OpenAPI spec  |
| `npm run generate-schema` | Genera lo schema TypeScript dall'API        |
| `npm run lint`            | Esegue ESLint                               |
| `npm run format:check`    | Verifica la formattazione con Prettier      |
| `npm run type:check`      | Verifica i tipi TypeScript                  |
| `npm run validate`        | Esegue lint + type check + format check     |

## Environment: build-time vs runtime

L'app usa due meccanismi diversi per le variabili d'ambiente:

### Build-time (Vite)

Le variabili `REACT_APP_*` definite nei file `.env.*` vengono iniettate al momento del build da Vite come `process.env.REACT_APP_*`. Sono fissate nel bundle JavaScript e non modificabili dopo il build.

File coinvolti: `.env.development`, `.env.production`, `.env.local`

### Runtime (Docker)

Le variabili `REACT_APP_ENVIRONMENT` e `REACT_APP_VERSION` vengono iniettate a runtime dal container Docker tramite `docker-entrypoint.sh`, che genera il file `public/static/env-config.js` con l'oggetto `window.react_env`.

Questo permette di usare la stessa immagine Docker in ambienti diversi (staging, production) cambiando solo le variabili d'ambiente del container.

File coinvolti: `docker-entrypoint.sh`, `public/static/env-config.js`, `src/types.d.ts`
