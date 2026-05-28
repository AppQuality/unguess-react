import { isDev } from 'src/common/isDevEnvironment';

export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID!,
      loginWith: {
        email: true,
        oauth: {
          domain: isDev()
            ? 'unguess-auth-staging.auth.eu-west-1.amazoncognito.com'
            : 'unguess-auth-production.auth.eu-west-1.amazoncognito.com',
          scopes: ['email', 'openid', 'profile'] as Array<
            'email' | 'openid' | 'profile'
          >,
          redirectSignIn: [`${window.location.origin}/callback`],
          redirectSignOut: [`${window.location.origin}/logout`],
          responseType: 'code' as const,
          providers: ['Google'] as Array<'Google'>,
        },
      },
      signUpVerificationMethod: 'code' as const,
      userAttributes: {
        email: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: false,
      },
    },
  },
};
