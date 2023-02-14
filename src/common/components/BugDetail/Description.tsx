import { MD } from '@appquality/unguess-design-system';
import { Bug } from 'src/features/api';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { WrappedText } from 'src/common/components/WrappedText';
import { Label } from './Label';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
  overflow-wrap: break-word;
`;

const TextBlock = styled.div`
  padding: ${({ theme }) => theme.space.xxs} 0;
`;
const Text = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[700]};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const StyledLabel = styled(Label)`
  margin-bottom: ${({ theme }) => theme.space.xs};
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
      <TextBlock>
        <StyledLabel>
          {t('__BUGS_PAGE_BUG_DETAIL_DESCRIPTION_LABEL')}
        </StyledLabel>
        <Text>
          <WrappedText>{bug.step_by_step}</WrappedText>
        </Text>
      </TextBlock>
      <TextBlock>
        <StyledLabel>
          {t('__BUGS_PAGE_BUG_DETAIL_EXPECTED_RESULT_LABEL')}
        </StyledLabel>
        <Text>
          <WrappedText>{bug.expected_result}</WrappedText>
        </Text>
      </TextBlock>
      <TextBlock>
        <StyledLabel>
          {t('__BUGS_PAGE_BUG_DETAIL_CURRENT_RESULT_LABEL')}
        </StyledLabel>
        <Text>
          <WrappedText>{bug.current_result}</WrappedText>
        </Text>
      </TextBlock>

      <TextBlock>
        <StyledLabel>
          {t('__BUGS_PAGE_BUG_DETAIL_ADDITIONAL_NOTES_LABEL')}
        </StyledLabel>
        <Text>{bug?.note || '--'}</Text>
      </TextBlock>
    </Container>
  );
};
