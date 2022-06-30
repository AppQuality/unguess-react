import HttpError from '../HttpError';

// export const campaigns = async (
//   workspaceId: number,
//   query?: string,
//   token?: string
// ): Promise<
//   ApiOperations['get-workspace-campaigns']['responses']['200']['content']['application/json']
// > => {
//   if (process.env.REACT_APP_DEFAULT_TOKEN)
//     token = process.env.REACT_APP_DEFAULT_TOKEN;

//   const requestHeaders: HeadersInit = new Headers();
//   requestHeaders.set('Content-Type', 'application/json');
//   if (token) {
//     requestHeaders.set('Authorization', `Bearer ${  token}`);
//   }
//   const url = `${
//     process.env.REACT_APP_API_URL
//   }/workspaces/${workspaceId}/campaigns${query ?? ''}`;

//   const res = await fetch(url, {
//     method: 'GET',
//     headers: requestHeaders,
//   });
//   if (res.ok) {
//     return res.json();
//   }
//     const json = await res.json();
//     throw new HttpError(res.status, res.statusText, json.err);

// };

export const createPages = async (campaignId: number) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  const url = `${process.env.REACT_APP_TRYBER_WP_API_URL}/regenerate-campaign-pages/${campaignId}`;

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

export const createTasks = async (campaignId: number) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  const url = `${process.env.REACT_APP_TRYBER_WP_API_URL}/regenerate-campaign-tasks/${campaignId}`;

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

export const createCrons = async (campaignId: number) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  const url = `${process.env.REACT_APP_TRYBER_WP_API_URL}/regenerate-campaign-crons/${campaignId}`;

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

export const createUseCases = async (campaignId: number) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  const url = `${process.env.REACT_APP_TRYBER_WP_API_URL}/regenerate-campaign-use-cases/${campaignId}`;

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
