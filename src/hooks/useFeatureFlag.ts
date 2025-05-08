import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';

export const useFeatureFlag = () => {
  const { role, features } = useAppSelector(
    (state) => ({
      role: state.user.userData.role,
      features: state.user.userData.features,
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
