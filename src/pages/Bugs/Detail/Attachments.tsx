import { LG, Tabs } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Bug } from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import BugMedia from './Media';
import BugExtra from './Extra';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
`;

const StyledTabs = styled(Tabs)`
  width: 100%;

  > button {
    width: 50%;
  }
`;

export default ({
  bug,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
  };
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <LG isBold style={{ margin: `${globalTheme.space.md} 0` }}>
        {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_LABEL')}
      </LG>
      <StyledTabs>
        <Tabs.Panel
          title={t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_MEDIA_TAB_TITLE')}
          style={{ width: '50%' }}
        >
          <BugMedia bug={bug} />
        </Tabs.Panel>
        <Tabs.Panel
          title={t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_EXTRA_TAB_TITLE')}
          style={{ width: '50%' }}
        >
          <BugExtra bug={bug} />
        </Tabs.Panel>
      </StyledTabs>
    </Container>
  );
};
