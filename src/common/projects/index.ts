import {
  GetProjectsByPidApiResponse,
  GetWorkspacesApiArg,
  GetWorkspacesApiResponse,
  GetWorkspacesByWidApiResponse,
  GetWorkspacesByWidProjectsApiResponse,
} from 'src/features/api';

import { stringify } from 'qs';
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
  const url = `${process.env.REACT_APP_API_URL}/workspaces/${workspace_id}/projects`;

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
  const url = `${process.env.REACT_APP_API_URL}/projects/${project_id}`;

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

  let args = '';
  if (params) {
    args = `?${stringify(params)}`;
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
  const url = `${process.env.REACT_APP_API_URL}/workspaces/${workspaceId}`;

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
