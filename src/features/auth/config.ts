export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'eu-west-1_5K62aLvDP',
      userPoolClientId: '2bh3uglh7ta88i2lb1ajro5a3t',
      loginWith: {
        email: true,
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
