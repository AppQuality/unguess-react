export default (route: string, key: string, value: string) => {
  const baseUrl = window.location.origin;
  const url = new URL(route, baseUrl);
  url.searchParams.set(key, value);
  return url.pathname + url.search;
};
