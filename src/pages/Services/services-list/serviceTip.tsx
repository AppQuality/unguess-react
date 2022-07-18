import { InfoCard } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { ReactComponent as InfoImg } from 'src/assets/icons/info-image.svg';
import { WaterButton } from 'src/common/components/waterButton';

export const ServiceTip = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  return (
    <InfoCard
      infoImg={<InfoImg />}
      infoTitle={t('__CATALOG_PAGE_INFO_SERVICE_TITLE')}
      infoSubtitle={t('__CATALOG_PAGE_INFO_SERVICE_SUBTITLE')}
      infoButtons={[
        <WaterButton
          isPill
          isPrimary
          size="small"
          onClick={() => {
            window.location.href = `mailto:${
              activeWorkspace?.csm.email || 'info@unguess.io'
            }`;
          }}
        >
          {t('__CATALOG_PAGE_INFO_SERVICE_BUTTON_CONTACT_LABEL')}
        </WaterButton>,
      ]}
    />
  );
};
