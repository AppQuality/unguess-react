import {
  GetProjectsByPidApiResponse,
  GetWorkspacesApiArg,
  GetWorkspacesApiResponse,
  GetWorkspacesByWidApiResponse,
  GetWorkspacesByWidProjectsApiResponse,
} from 'src/features/api';

import HttpError from '../HttpError';

export const projects = async (
  workspace_id: number,
  token?: string
): Promise<GetWorkspacesByWidProjectsApiResponse> => {
  let currentToken = token;

  if (process.env.REACT_APP_DEFAULT_TOKEN)
    currentToken = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  if (currentToken) {
    requestHeaders.set('Authorization', `Bearer ${currentToken}`);
  }

  const urlps = new URLSearchParams();
  const urlParams = new URLSearchParams(window.location.search);
  const rp = urlParams.get('ugReverseProxy');
  if (typeof rp !== 'undefined') {
    urlps.set('ugReverseProxy', '1');
  }

  let args = '';
  if (urlps.toString().length > 0) {
    args = `?${urlps.toString()}`;
  }
  const url = `${process.env.REACT_APP_API_URL}/workspaces/${workspace_id}/projects${args}`;

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

export const project = async (
  project_id: number,
  token?: string
): Promise<GetProjectsByPidApiResponse> => {
  let currentToken = token;

  if (process.env.REACT_APP_DEFAULT_TOKEN)
    currentToken = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  if (currentToken) {
    requestHeaders.set('Authorization', `Bearer ${currentToken}`);
  }

  const urlps = new URLSearchParams();
  const urlParams = new URLSearchParams(window.location.search);
  const rp = urlParams.get('ugReverseProxy');
  if (typeof rp !== 'undefined') {
    urlps.set('ugReverseProxy', '1');
  }

  let args = '';
  if (urlps.toString().length > 0) {
    args = `?${urlps.toString()}`;
  }
  const url = `${process.env.REACT_APP_API_URL}/projects/${project_id}${args}`;

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

export const workspaces = async (
  token?: string,
  params?: GetWorkspacesApiArg
): Promise<GetWorkspacesApiResponse> => {
  let currentToken = token;

  if (process.env.REACT_APP_DEFAULT_TOKEN)
    currentToken = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  if (currentToken) {
    requestHeaders.set('Authorization', `Bearer ${currentToken}`);
  }

  const urlps = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      urlps.set(key, value.toString());
    });
  }
  const urlParams = new URLSearchParams(window.location.search);
  const rp = urlParams.get('ugReverseProxy');
  if (typeof rp !== 'undefined') {
    urlps.set('ugReverseProxy', '1');
  }

  let args = '';
  if (urlps.toString().length > 0) {
    args = `?${urlps.toString()}`;
  }

  const url = `${process.env.REACT_APP_API_URL}/workspaces${args}`;

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

export const workspacesById = async (
  workspaceId: number,
  token?: string
): Promise<GetWorkspacesByWidApiResponse> => {
  let currentToken = token;

  if (process.env.REACT_APP_DEFAULT_TOKEN)
    currentToken = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  if (currentToken) {
    requestHeaders.set('Authorization', `Bearer ${currentToken}`);
  }

  const urlps = new URLSearchParams();
  const urlParams = new URLSearchParams(window.location.search);
  const rp = urlParams.get('ugReverseProxy');
  if (typeof rp !== 'undefined') {
    urlps.set('ugReverseProxy', '1');
  }

  let args = '';
  if (urlps.toString().length > 0) {
    args = `?${urlps.toString()}`;
  }

  const url = `${process.env.REACT_APP_API_URL}/workspaces/${workspaceId}${args}`;

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
