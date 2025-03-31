import { PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';

const TemplatesPageHeader = () => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main mainTitle={t('__PAGE_TITLE_TEMPLATES')}>
          <PageHeader.Title>
            <PageTitle>{t('__TEMPLATES_PAGE_HEADER_TITLE')}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Description style={{ whiteSpace: 'pre-wrap' }}>
            {t('__TEMPLATES_PAGE_HEADER_DESCRIPTION')}
          </PageHeader.Description>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default TemplatesPageHeader;
