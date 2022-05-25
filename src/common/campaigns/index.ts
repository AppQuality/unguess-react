import HttpError from '../HttpError';

export const campaigns = async (
  workspace_id: number,
  query?: string,
  token?: string
): Promise<
  ApiOperations['get-workspace-campaigns']['responses']['200']['content']['application/json']
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${  token}`);
  }
  const url = `${
    process.env.REACT_APP_API_URL
  }/workspaces/${workspace_id}/campaigns${query ?? ''}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: requestHeaders,
  });
  if (res.ok) {
    return await res.json();
  } 
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  
};

export const create_pages = async (campaign_id: number) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  const url = `${process.env.REACT_APP_TRYBER_WP_API_URL}/regenerate-campaign-pages/${campaign_id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: requestHeaders,
  });
  if (res.ok) {
    return await res.json();
  } 
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  
};

export const create_tasks = async (campaign_id: number) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  const url = `${process.env.REACT_APP_TRYBER_WP_API_URL}/regenerate-campaign-tasks/${campaign_id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: requestHeaders,
  });
  if (res.ok) {
    return await res.json();
  } 
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  
};

export const create_crons = async (campaign_id: number) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  const url = `${process.env.REACT_APP_TRYBER_WP_API_URL}/regenerate-campaign-crons/${campaign_id}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: requestHeaders,
  });
  if (res.ok) {
    return await res.json();
  } 
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  
};
