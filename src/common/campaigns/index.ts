import HttpError from '../HttpError';
import { isDev } from '../isDevEnvironment';

export const createPages = async (campaignId: number) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  const baseUrl = isDev() ? 'https://dev.tryber.me' : 'https://app.tryber.me';

  const url = `${baseUrl}/wp-json/appq/v1/regenerate-campaign-pages/${campaignId}`;

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
  const baseUrl = isDev() ? 'https://dev.tryber.me' : 'https://app.tryber.me';

  const url = `${baseUrl}/wp-json/appq/v1/regenerate-campaign-tasks/${campaignId}`;

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
  const baseUrl = isDev() ? 'https://dev.tryber.me' : 'https://app.tryber.me';

  const url = `${baseUrl}/wp-json/appq/v1/regenerate-campaign-crons/${campaignId}`;

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
  const baseUrl = isDev() ? 'https://dev.tryber.me' : 'https://app.tryber.me';

  const url = `${baseUrl}/wp-json/appq/v1/regenerate-campaign-use-cases/${campaignId}`;

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
