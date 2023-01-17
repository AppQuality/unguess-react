import { MD } from '@appquality/unguess-design-system';
import { Bug } from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
  white-space: pre-wrap;
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
      <MD isBold style={{ marginBottom: globalTheme.space.sm }}>
        {t('__BUGS_PAGE_BUG_DETAIL_DESCRIPTION_LABEL')}
      </MD>
      <MD>{bug.step_by_step}</MD>
      <MD isBold style={{ margin: `${globalTheme.space.sm} 0` }}>
        {t('__BUGS_PAGE_BUG_DETAIL_EXPECTED_RESULT_LABEL')}
      </MD>
      <MD>{bug.expected_result}</MD>
      <MD isBold style={{ margin: `${globalTheme.space.sm} 0` }}>
        {t('__BUGS_PAGE_BUG_DETAIL_CURRENT_RESULT_LABEL')}
      </MD>
      <MD>{bug.current_result}</MD>
      {bug.note && (
        <>
          <MD isBold style={{ margin: `${globalTheme.space.sm} 0` }}>
            {t('__BUGS_PAGE_BUG_DETAIL_ADDITIONAL_NOTES_LABEL')}
          </MD>
          <MD>{bug.note}</MD>
        </>
      )}
    </Container>
  );
};
