import { PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';

const VideoPageHeader = () => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main
          mainTitle={t('__VIDEO_PAGE_TITLE')}
          mainDescription={t('__VIDEO_PAGE_DESCRIPTION')}
        >
          <PageHeader.Title>
            <PageTitle>{t('__VIDEO_PAGE_TITLE')}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Description>
            {t('__VIDEO_PAGE_DESCRIPTION')}
          </PageHeader.Description>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideoPageHeader;
