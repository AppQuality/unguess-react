import { Button, InfoCard } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as InfoImg } from 'src/assets/icons/info-image.svg';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

export const ServiceTip = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();

  return (
    <InfoCard
      infoImg={<InfoImg />}
      infoTitle={t('__CATALOG_PAGE_INFO_SERVICE_TITLE')}
      infoSubtitle={t('__CATALOG_PAGE_INFO_SERVICE_SUBTITLE')}
      infoButtons={[
        <Button
          isPrimary
          size="small"
          isAccent
          onClick={() => {
            window.location.href = `mailto:${
              activeWorkspace?.csm.email || 'info@unguess.io'
            }`;
          }}
        >
          {t('__CATALOG_PAGE_INFO_SERVICE_BUTTON_CONTACT_LABEL')}
        </Button>,
      ]}
    />
  );
};
