import {
  MD,
  Skeleton,
  TextDescription,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { WrappedText } from 'src/common/components/WrappedText';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
  overflow-wrap: break-word;
`;

const TextBlock = styled.div`
  padding: ${({ theme }) => theme.space.xxs} 0;
`;
const Text = styled(TextDescription)`
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const StyledLabel = styled(MD)`
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

export default () => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const currentBugId = getSelectedBugId();
  const {
    data: bug,
    isLoading,
    isFetching,
    isError,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId ?? '',
    bid: currentBugId ? currentBugId.toString() : '',
  });

  if (isError || !bug) return null;

  if (isLoading || isFetching) return <Skeleton />;
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
