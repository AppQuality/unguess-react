import HttpError from "../HttpError";

export const projects = async (
  workspace_id: number,
  token?: string,
): Promise<
  ApiOperations["get-workspace-projects"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  let url = `${process.env.REACT_APP_API_URL}/workspaces/${workspace_id}/projects`;
  
  const res = await fetch(url, {
    method: "GET",
    headers: requestHeaders,
  });
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};

export const project = async (
  project_id: number,
  token?: string,
): Promise<
  ApiOperations["get-projects-projectId"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  let url = `${process.env.REACT_APP_API_URL}/projects/${project_id}`;
  
  const res = await fetch(url, {
    method: "GET",
    headers: requestHeaders,
  });
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};

export const workspaces = async (
    token?: string,
  ): Promise<
    ApiOperations["get-workspaces"]["responses"]["200"]["content"]["application/json"]
  > => {
    if (process.env.REACT_APP_DEFAULT_TOKEN)
      token = process.env.REACT_APP_DEFAULT_TOKEN;
  
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    if (token) {
      requestHeaders.set("Authorization", "Bearer " + token);
    }
    let url = `${process.env.REACT_APP_API_URL}/workspaces`;
    
    const res = await fetch(url, {
      method: "GET",
      headers: requestHeaders,
    });
    if (res.ok) {
      return await res.json();
    } else {
      const json = await res.json();
      throw new HttpError(res.status, res.statusText, json.err);
    }
  };
