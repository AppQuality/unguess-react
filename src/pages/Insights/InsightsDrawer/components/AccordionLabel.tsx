import styled from 'styled-components';
import {
  Accordion,
  IconButton,
  LG,
  Tooltip,
} from '@appquality/unguess-design-system';
import { ReactComponent as Published } from '@zendeskgarden/svg-icons/src/16/lock-unlocked-fill.svg';
import { ReactComponent as NotPublished } from '@zendeskgarden/svg-icons/src/16/lock-locked-stroke.svg';
import { GetCampaignsByCidInsightsApiResponse } from 'src/features/api';
import { usePublishInsight } from '../hooks/usePublishInsight';

const Style = styled(Accordion.Label)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

export const AccordionLabel = ({
  insight,
}: {
  insight: GetCampaignsByCidInsightsApiResponse[number];
}) => {
  const { handlePublish, result } = usePublishInsight({
    title: insight.title,
    id: insight.id.toString(),
    isPublished: insight.visible,
  });
  return (
    <Style>
      <LG isBold>{insight.title}</LG>
      <Tooltip
        content={
          insight.visible
            ? 'Click to unpublish this insight'
            : 'Click to publish insight'
        }
      >
        <IconButton
          onClick={handlePublish}
          disabled={result.status === 'pending'}
        >
          {insight.visible ? <Published /> : <NotPublished />}
        </IconButton>
      </Tooltip>
    </Style>
  );
};
