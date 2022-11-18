import styled from 'styled-components';
import { ReactComponent as EmptyReportsImage } from 'src/assets/emptyReports.svg';
import {
  Paragraph,
  theme as globalTheme,
  XL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <CenteredContent>
      <EmptyReportsImage />
      <XL
        style={{
          fontWeight: globalTheme.fontWeights.medium,
          marginTop: globalTheme.space.xl,
          marginBottom: globalTheme.space.sm,
        }}
      >
        {t('__CAMPAIGN_PAGE_REPORTS_EMPTY_REPORTS_TITLE')}
      </XL>
      <Paragraph style={{ textAlign: 'center' }}>
        {t('__CAMPAIGN_PAGE_REPORTS_EMPTY_REPORTS_TEXT')}
      </Paragraph>
    </CenteredContent>
  );
};
