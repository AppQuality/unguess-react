export const isDev = () => {
  if (typeof react_env === 'undefined') {
    return true;
  }
  return ['staging', 'local'].includes(react_env.REACT_APP_ENV);
};
