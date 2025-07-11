import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import { useGetUsersMeQuery } from 'src/features/api';

export const useFeatureFlag = () => {
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError,
  } = useGetUsersMeQuery();

  if (isUserDataLoading || isError || !userData) {
    return { hasFeatureFlag: () => false };
  }

  const { role, features } = useAppSelector(
    () => ({
      role: userData.role,
      features: userData.features,
    }),
    shallowEqual
  );

  const hasFeatureFlag = (slug?: string) => {
    if (role === 'administrator') {
      return true;
    }
    if (features) {
      return features.some((feature) => feature.slug === slug);
    }
    return false;
  };

  return { hasFeatureFlag };
};
