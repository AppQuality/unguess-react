import { Paragraph } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

const NoObservations = () => {
  const { t } = useTranslation();

  return <Paragraph>{t('__VIDEO_PAGE_NO_OBSERVATIONS')}</Paragraph>;
};

export { NoObservations };
