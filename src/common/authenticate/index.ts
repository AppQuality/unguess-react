import { operations } from '../schema';

export const login = (
  credentials: operations['post-authenticate']['requestBody']['content']['application/json']
) => fetch(`${process.env.REACT_APP_API_URL}/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.token) {
        return { token: data.token };
      }
      return { token: false, error: data };
    });
