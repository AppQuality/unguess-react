import styled from 'styled-components';
import EmptyStatePicture from 'src/assets/emptyReports.png';
import { Paragraph, XL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

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
      <img
        src={EmptyStatePicture}
        alt="no data"
        style={{
          marginTop: appTheme.space.lg,
          width: '100%',
          maxWidth: '380px',
        }}
      />
      <XL
        style={{
          fontWeight: appTheme.fontWeights.medium,
          marginTop: appTheme.space.xl,
          marginBottom: appTheme.space.sm,
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
