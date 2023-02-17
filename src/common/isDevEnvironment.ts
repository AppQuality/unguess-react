export const isDev = () =>
  ['staging', 'local'].includes(react_env.REACT_APP_ENV);
