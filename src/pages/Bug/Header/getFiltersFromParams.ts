export const getFiltersFromParams = (searchParams: URLSearchParams) => ({
  unique:
    searchParams.get('unique') === 'true' ||
    searchParams.get('unique') === null,
  unread: searchParams.get('unread') === 'true',
  severities:
    searchParams.getAll('severities').length > 0
      ? searchParams.getAll('severities')
      : null,
  devices:
    searchParams.getAll('devices').length > 0
      ? searchParams.getAll('devices')
      : null,
  os: searchParams.getAll('os').length > 0 ? searchParams.getAll('os') : null,
  usecase:
    searchParams.getAll('useCases').length > 0
      ? searchParams.getAll('useCases')
      : null,
  priorities:
    searchParams.getAll('priorities').length > 0
      ? searchParams.getAll('priorities')
      : null,
  replicabilities:
    searchParams.getAll('replicabilities').length > 0
      ? searchParams.getAll('replicabilities')
      : null,
  types:
    searchParams.getAll('types').length > 0
      ? searchParams.getAll('types')
      : null,
  tags:
    searchParams.getAll('tags').length > 0 ? searchParams.getAll('tags') : null,
  status:
    searchParams.getAll('customStatuses').length > 0
      ? searchParams.getAll('customStatuses')
      : null,
  search:
    searchParams.getAll('search').length > 0
      ? searchParams.getAll('search')
      : null,
});
