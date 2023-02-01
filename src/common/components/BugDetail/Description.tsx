import { MD } from '@appquality/unguess-design-system';
import { Bug } from 'src/features/api';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
  white-space: pre-wrap;
`;

const Label = styled(({ children, className, style }) => (
  <MD className={className} style={style} isBold>
    {children}
  </MD>
))`
  margin: ${({ theme }) => `${theme.space.sm} 0 ${theme.space.xs} 0 `};
`;

const Text = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[700]};
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
      <Label style={{ marginTop: 0 }}>
        {t('__BUGS_PAGE_BUG_DETAIL_DESCRIPTION_LABEL')}
      </Label>
      <Text>{bug.step_by_step}</Text>
      <Label>{t('__BUGS_PAGE_BUG_DETAIL_EXPECTED_RESULT_LABEL')}</Label>
      <Text>{bug.expected_result}</Text>
      <Label>{t('__BUGS_PAGE_BUG_DETAIL_CURRENT_RESULT_LABEL')}</Label>
      <Text>{bug.current_result}</Text>
      {bug.note && (
        <>
          <Label>{t('__BUGS_PAGE_BUG_DETAIL_ADDITIONAL_NOTES_LABEL')}</Label>
          <Text>{bug.note}</Text>
        </>
      )}
    </Container>
  );
};
