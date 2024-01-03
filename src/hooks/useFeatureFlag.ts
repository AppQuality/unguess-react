import { useAppSelector } from 'src/app/hooks';

export const useFeatureFlag = () => {
  const { userData: user } = useAppSelector((state) => state.user);

  const hasFeatureFlag = (slug?: string) => {
    if (user && user.role === 'administrator') {
      return true;
    }
    if (user && user.features) {
      return user.features.some((feature) => feature.slug === slug);
    }
    return false;
  };

  return { hasFeatureFlag };
};
