import { PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';

export const CampaignPageHeader = ({ pageTitle }: { pageTitle?: string }) => {
  const { t } = useTranslation();
  const { status } = useAppSelector((state) => state.user);

  return status === 'idle' || status === 'loading' ? null : (
    <PageHeader>
      <PageHeader.Main infoTitle={pageTitle || 'My Campaign'}>
        <PageHeader.Title>{pageTitle || 'My Campaign'}</PageHeader.Title>
      </PageHeader.Main>
    </PageHeader>
  );
};
