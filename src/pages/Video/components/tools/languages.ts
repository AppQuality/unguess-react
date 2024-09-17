import { useTranslation } from 'react-i18next';

interface Lang {
  value: string;
  label: string;
}

const getLanguages = () => {
  const { t } = useTranslation();

  const languages: Lang[] = [
    { value: 'en', label: t('__TOOLS_TRANSLATE_LANGUAGE_EN_LABEL') },
    { value: 'it', label: t('__TOOLS_TRANSLATE_LANGUAGE_IT_LABEL') },
    { value: 'es', label: t('__TOOLS_TRANSLATE_LANGUAGE_ES_LABEL') },
    { value: 'fr', label: t('__TOOLS_TRANSLATE_LANGUAGE_FR_LABEL') },
    { value: 'de', label: t('__TOOLS_TRANSLATE_LANGUAGE_DE_LABEL') },
  ];

  return languages;
};

export { getLanguages };
