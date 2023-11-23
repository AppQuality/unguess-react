import { Button, LG, MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EmptyImg } from './assets/no-findings.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: ${({ theme }) => `${theme.space.xxl} 0`};
`;

export const Empty = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <EmptyImg />
      <LG
        style={{
          color: appTheme.palette.blue[600],
          marginTop: appTheme.space.md,
        }}
      >
        {t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_EMPTY_TITLE')}
      </LG>
      <MD
        style={{
          color: appTheme.palette.grey[500],
          margin: `${appTheme.space.md} auto`,
        }}
      >
        {t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_EMPTY_DESCRIPTION')}
      </MD>
      <Button isAccent isPrimary size="medium" onClick={onClick}>
        {t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_EMPTY_BUTTON')}
      </Button>
    </Container>
  );
};
