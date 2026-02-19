# JoinPage-new

Nuova implementazione della Join Page con separazione tra registrazione e onboarding, utilizzando AWS Cognito per l'autenticazione.

## 📁 Struttura

```
JoinPage-new/
├── index.tsx                           # Router principale
├── SignupPage/                         # Registrazione nuovi utenti
│   ├── index.tsx                      # Pagina principale
│   ├── SignupForm.tsx                 # Form email + password
│   ├── ConfirmEmailForm.tsx           # Form conferma codice OTP
│   └── validationSchema.ts            # Schema validazione Yup
├── OnboardingPage/                     # Flusso onboarding (comune a tutti)
│   ├── index.tsx                      # Pagina principale
│   ├── OnboardingProvider.tsx         # Context per gestire stato multi-step
│   ├── Steps/
│   │   ├── PersonalInfoStep.tsx       # Step 1: dati personali
│   │   └── WorkspaceStep.tsx          # Step 2: workspace
│   └── validationSchema.ts            # Schemi validazione
└── InvitedUserPage/                    # Gestione utenti invitati
    ├── index.tsx                      # Pagina principale
    ├── SetPasswordForm.tsx            # Form cambio password
    └── validationSchema.ts            # Schema validazione
```

## 🔄 Flusso Utente

### 1. Utente Nuovo (non invitato)

1. `/join/signup` - Inserisce email e password
2. Registrazione via Cognito (`useAuth().signup()`)
3. Riceve codice OTP via email
4. Conferma email con codice OTP
5. Redirect a `/join/onboarding`
6. Completa onboarding (dati personali + workspace)
7. Redirect a dashboard `/`

### 2. Utente Invitato

1. `/join/:profile/:token` - Link ricevuto via email
2. Verifica validità token
3. Imposta nuova password (con Cognito)
4. Redirect a `/join/onboarding`
5. Completa onboarding (dati personali + workspace)
6. Redirect a dashboard `/`

## 🔐 Autenticazione

Utilizza il context `AuthProvider` da `src/features/auth/context.tsx`:

```tsx
const { signup, confirmSignup, login } = useAuth();
```

### Metodi disponibili:

- `signup(email, password, name)` - Registrazione nuovo utente
- `confirmSignup(email, code)` - Conferma email con OTP
- `login(email, password)` - Login utente esistente
- `logout()` - Logout
- `getAccessToken()` - Ottiene token JWT

## 📝 TODO

### Completati ✅

- [x] Struttura cartelle e file base
- [x] SignupPage con form registrazione
- [x] Form conferma email (OTP)
- [x] OnboardingPage con context multi-step
- [x] PersonalInfoStep (Step 1 onboarding)
- [x] WorkspaceStep (Step 2 onboarding)
- [x] InvitedUserPage con validazione token
- [x] Form cambio password per invitati

### Da fare 🔨

- [ ] **API Integration**
  - [ ] Endpoint per salvare dati onboarding
  - [ ] Endpoint per verificare se onboarding è completato
  - [ ] Integrazione cambio password Cognito per invitati
- [ ] **Login Guard**
  - [ ] Aggiungere controllo al login
  - [ ] Redirect a onboarding se non completato
- [ ] **Error Handling**
  - [ ] Gestione errori Cognito (utente già esistente, email non valida, ecc.)
  - [ ] Messaggi di errore localizzati
  - [ ] Retry mechanism per chiamate API
- [ ] **UX Improvements**
  - [ ] Loading states più dettagliati
  - [ ] Animazioni transizioni tra step
  - [ ] Progress indicator per onboarding
  - [ ] Possibilità di tornare indietro negli step
- [ ] **Testing**

  - [ ] Unit tests per forms e validazioni
  - [ ] Integration tests per flussi completi
  - [ ] E2E tests con Playwright

- [ ] **Internazionalizzazione**

  - [ ] Aggiungere chiavi mancanti nei file di traduzione
  - [ ] Verificare traduzioni IT/EN

- [ ] **Routing**
  - [ ] Integrare route `/join` nell'app principale
  - [ ] Gestire redirect da vecchia JoinPage

## 🌐 Chiavi i18n Necessarie

Aggiungere nei file `locales/*/translation.json`:

```json
{
  "__PAGE_JOIN_TITLE": "Join Unguess",
  "__PAGE_JOIN_DESCRIPTION": "Create your account",
  "__PAGE_ONBOARDING_TITLE": "Welcome to Unguess",
  "__PAGE_ONBOARDING_DESCRIPTION": "Complete your profile",
  "__PAGE_INVITED_USER_TITLE": "Welcome",
  "__PAGE_INVITED_USER_DESCRIPTION": "Set your password",

  "SIGNUP_FORM_STEP_1_TITLE": "Create your account",
  "SIGNUP_FORM_STEP_1_DESCRIPTION": "Get started with Unguess",
  "SIGNUP_FORM_EMAIL_LABEL": "Email",
  "SIGNUP_FORM_EMAIL_PLACEHOLDER": "your.email@company.com",
  "SIGNUP_FORM_PASSWORD_LABEL": "Password",
  "SIGNUP_FORM_PASSWORD_PLACEHOLDER": "Enter your password",
  "SIGNUP_FORM_TERMS_LABEL": "I agree to the <termsLink>Terms</termsLink> and <privacyLink>Privacy Policy</privacyLink>",
  "SIGNUP_FORM_BUTTON_SIGNUP": "Sign up",
  "SIGNUP_FORM_ALREADY_HAVE_ACCOUNT": "Already have an account?",
  "SIGNUP_FORM_LOGIN_LINK": "Log in",

  "CONFIRM_EMAIL_TITLE": "Confirm your email",
  "CONFIRM_EMAIL_DESCRIPTION": "We sent a code to {{email}}",
  "CONFIRM_EMAIL_CODE_LABEL": "Verification code",
  "CONFIRM_EMAIL_CODE_PLACEHOLDER": "Enter 6-digit code",
  "CONFIRM_EMAIL_BUTTON": "Confirm",

  "INVITED_USER_TITLE": "Set your password",
  "INVITED_USER_DESCRIPTION": "Create a password for <bold>{{email}}</bold>",
  "SET_PASSWORD_LABEL": "New password",
  "SET_PASSWORD_PLACEHOLDER": "Enter your password",
  "CONFIRM_PASSWORD_LABEL": "Confirm password",
  "CONFIRM_PASSWORD_PLACEHOLDER": "Re-enter your password",
  "SET_PASSWORD_BUTTON": "Continue",

  "SIGNUP_FORM_NEXT_STEP": "Continue",
  "LOADING": "Loading...",

  // Errori
  "SIGNUP_ERROR_GENERIC": "An error occurred during signup",
  "CONFIRM_EMAIL_ERROR_GENERIC": "Invalid or expired code",
  "SET_PASSWORD_ERROR_GENERIC": "Unable to set password",
  "ONBOARDING_ERROR_GENERIC": "Unable to save your data",
  "INVITED_USER_ERROR_INVALID_TOKEN": "Invalid or expired invitation link"
}
```

## 🔗 Integrazione

Per integrare nel routing principale dell'app (`src/common/Pages.tsx`):

```tsx
import JoinPageNew from 'src/pages/JoinPage-new';

// Aggiungi route
<Route path="/join/*" element={<JoinPageNew />} />;
```

## 🎨 Styling

Gli stili seguono il design system esistente usando:

- `@appquality/unguess-design-system` per componenti UI
- `styled-components` per custom styling
- `appTheme` per colori e spacing consistenti

## 📊 Analytics

Gli eventi GTM sono tracciati per monitorare il funnel:

- `sign-up-flow` - Eventi di registrazione
- `onboarding-flow` - Eventi di onboarding

Eventi principali:

- `start` - Inizio registrazione
- `signup success` - Registrazione completata
- `email confirmed` - Email confermata
- `personal-info-completed` - Step 1 onboarding completato
- `completed` - Onboarding completato
- Errori vari con dettagli

## 🔄 Migrazione dalla vecchia JoinPage

La vecchia JoinPage è ancora presente in `src/pages/JoinPage/`. Una volta testata e validata la nuova versione:

1. Aggiornare routing per puntare a JoinPage-new
2. Migrare asset e risorse necessarie
3. Testare tutti i flussi (invitati e non)
4. Deprecare e rimuovere vecchia JoinPage
