import HttpError from './HttpError';

const apifetch = async ({
  endpoint,
  method = 'GET',
  body,
  params,
  token,
  paramType,
}: {
  endpoint: string;
  method?: string;
  body?: object;
  params?: object;
  token?: string;
  paramType?: string;
}) => {
  let currentToken = token;

  if (process.env.REACT_APP_DEFAULT_TOKEN)
    currentToken = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  if (currentToken) {
    requestHeaders.set('Authorization', `Bearer ${currentToken}`);
  }

  let query = '';
  if (params && Object.keys(params).length) {
    const urlps = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (paramType === 'filterBy') {
        urlps.set(`filterBy[${key}]`, value);
      } else {
        urlps.set(key, value);
      }
    });
    query = `?${urlps.toString()}`;
  }
  const fetchData: { method: string; headers: Headers; body?: string } = {
    method,
    headers: requestHeaders,
  };
  if (body) {
    fetchData.body = JSON.stringify(body);
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}${endpoint}${query}`,
    fetchData
  );
  if (res.ok) {
    return res.json();
  }
  const json = await res.json();
  throw new HttpError(res.status, res.statusText, json.message || json.err);
};

export default apifetch;
