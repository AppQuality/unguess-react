import HttpError from "./HttpError";

const apifetch = async ({
  endpoint,
  method = "GET",
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
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  let query = "";
  if (params && Object.keys(params).length) {
    let urlps = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (paramType === "filterBy") {
        urlps.set(`filterBy[${key}]`, value);
      } else {
        urlps.set(key, value);
      }
    });
    query = "?" + urlps.toString();
  }
  const fetchData: { method: string; headers: Headers; body?: string } = {
    method: method,
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
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.message || json.err);
  }
};

export default apifetch;
