import { Header } from 'src/common/components/navigation/header/header';
import { useGetUsersMePreferencesQuery } from 'src/features/api';

export const NavigationHeader = ({ isMinimal }: { isMinimal?: boolean }) => {
  const { isFetching: isFetchingPrefs } = useGetUsersMePreferencesQuery();

  return (
    <Header
      {...(isMinimal && {
        style: { display: 'none', opacity: isFetchingPrefs ? 0.5 : 1 },
      })}
    />
  );
};
