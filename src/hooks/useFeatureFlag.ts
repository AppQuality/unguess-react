import { useGetUsersMeQuery } from 'src/features/api';

export const useFeatureFlag = () => {
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isFetching: isUserFetching,
    isError,
  } = useGetUsersMeQuery();

  if (isUserDataLoading || isUserFetching || isError || !userData) {
    return { hasFeatureFlag: () => false };
  }

  const { role, features = [] } = userData;

  const hasFeatureFlag = (slug?: string) => {
    if (role === 'administrator') {
      return true;
    }

    return features.some((feature) => feature.slug === slug);
  };

  return { hasFeatureFlag };
};
