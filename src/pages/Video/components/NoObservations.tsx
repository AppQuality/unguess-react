import { Paragraph, XXL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EmptyImage } from 'src/assets/empty-observations.svg';

const NoObservations = () => {
  const { t } = useTranslation();

  return (
    <>
      <EmptyImage />
      <XXL isBold style={{ marginTop: appTheme.space.md }}>
        {t('__VIDEO_PAGE_NO_OBSERVATIONS_TITLE')}
      </XXL>
      <Paragraph>{t('__VIDEO_PAGE_NO_OBSERVATIONS')}</Paragraph>
    </>
  );
};

export { NoObservations };
