import { useGetHubsByHidQuery, useGetUsersMeQuery } from 'src/features/api';

export const useHub = (hubId: number) => {
  const { isLoading: isUserLoading, isFetching: isUserFetching } =
    useGetUsersMeQuery();

  const {
    isLoading,
    isFetching,
    isError,
    data: hub,
  } = useGetHubsByHidQuery({ hid: hubId.toString() });

  if (isLoading || isFetching || !hub) {
    return { isLoading: true as const };
  }

  if (isError) {
    return { isError: true as const };
  }

  return {
    isLoading: false as const,
    isError: false as const,
    isUserLoading: isUserLoading || isUserFetching,
    hub,
  };
};
