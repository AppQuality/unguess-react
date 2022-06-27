import {
  GetProjectsByPidApiResponse,
  GetWorkspacesApiResponse,
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
  token?: string
): Promise<GetWorkspacesApiResponse> => {
  let currentToken = token;

  if (process.env.REACT_APP_DEFAULT_TOKEN)
    currentToken = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  if (currentToken) {
    requestHeaders.set('Authorization', `Bearer ${currentToken}`);
  }
  const url = `${process.env.REACT_APP_API_URL}/workspaces`;

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
): Promise<GetWorkspacesApiResponse> => {
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
