import { getAllLanguageTags } from '@appquality/languages';
import { useGetUsersMePreferencesQuery } from 'src/features/api';

export const usePreferredLanguage = () => {
  const { data: preferences } = useGetUsersMePreferencesQuery();
  const languageTags = getAllLanguageTags();

  const languagePreference = preferences?.items?.find(
    (preference) => preference?.name === 'translations_language'
  );

  const preferredLanguage = languageTags.find(
    (lang) => lang === languagePreference?.value
  );

  return preferredLanguage;
};
