import HttpError from "../HttpError";

export const me = async (
  token?: string,
  query?: string
): Promise<
  ApiOperations["get-users-me"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  let url = `${process.env.REACT_APP_API_URL}/users/me`;
  console.log("url", url);
  if (query) {
    let urlps = new URLSearchParams();
    urlps.set("fields", query);
    url += "?" + urlps.toString();
  }
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
