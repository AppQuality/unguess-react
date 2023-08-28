import { operations } from '../schema';

export const login = (
  credentials: operations['post-authenticate']['requestBody']['content']['application/json']
) => {
  const urlParams = new URLSearchParams(window.location.search);
  const rp = urlParams.get('ugReverseProxy');

  return fetch(
    `${process.env.REACT_APP_API_URL}/authenticate${
      typeof rp === 'undefined' ? '' : '?ugReverseProxy=1'
    }`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }
  )
    .then((data) => data.json())
    .then((data) => {
      if (data.token) {
        return { token: data.token };
      }
      return { token: false, error: data };
    });
};
