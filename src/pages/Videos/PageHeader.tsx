import { PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';

const VideosPageHeader = () => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main
          mainTitle={t('__VIDEOS_PAGE_TITLE')}
          mainDescription={t('__VIDEOS_PAGE_DESCRIPTION')}
        >
          <PageHeader.Title>
            <PageTitle>{t('__VIDEOS_PAGE_TITLE')}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Description>
            {t('__VIDEOS_PAGE_DESCRIPTION')}
          </PageHeader.Description>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideosPageHeader;
