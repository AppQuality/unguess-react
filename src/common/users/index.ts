import { GetUsersMeApiResponse } from 'src/features/api';
import HttpError from '../HttpError';

export const me = async (
  token?: string,
  query?: string
): Promise<
  GetUsersMeApiResponse
> => {
  let currentToken = token;

  if (process.env.REACT_APP_DEFAULT_TOKEN)
    currentToken = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  if (currentToken) {
    requestHeaders.set('Authorization', `Bearer ${currentToken}`);
  }
  let url = `${process.env.REACT_APP_API_URL}/users/me`;
  if (query) {
    const urlps = new URLSearchParams();
    urlps.set('fields', query);
    url += `?${  urlps.toString()}`;
  }
  const res = await fetch(url, {
    method: 'GET',
    headers: requestHeaders,
  });
  if (res.ok) {
    return res.json();
  } 
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  
};
