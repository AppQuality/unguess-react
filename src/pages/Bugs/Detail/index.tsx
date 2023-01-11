import { Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useBugDetail } from './useBugDetail';
import BugHeader from './Header';
import BugDescription from './Description';
import BugTags from './Tags';
import BugAttachments from './Attachments';
import BugCustomFields from './CustomFields';

const DetailContainer = styled.div`
  background-color: white;
  border: ${({ theme }) => theme.palette.grey[300]} 1px solid;
  border-top-left-radius: ${({ theme }) => theme.space.xs};
  border-bottom-left-radius: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => `${theme.space.lg} ${theme.space.lg}`};
`;

const BugsDetail = ({ campaignId }: { campaignId: number; }) => {
  const result = useBugDetail({
    cid: campaignId,
  });

  const { data: bug, isLoading, isFetching, isError } = result;

  if (isLoading || isFetching || isError || !bug) return <Skeleton />;

  return (
    <DetailContainer>
      <BugHeader bug={bug} />
      <BugDescription />
      <BugTags />
      <BugAttachments />
      <BugCustomFields />
    </DetailContainer>
  );
};

export { BugsDetail };
