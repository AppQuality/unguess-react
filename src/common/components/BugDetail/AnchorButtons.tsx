import styled from 'styled-components';
import { Link } from 'react-scroll';
import { IconButton } from '@appquality/unguess-design-system';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';
import { ReactComponent as AttachmentsIcon } from 'src/assets/icons/attachments-icon.svg';
import { ReactComponent as DetailsIcon } from 'src/assets/icons/details-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/linked.svg';
import { useBugPreviewContext } from 'src/pages/Bugs/Content/context/BugPreviewContext';

const FlexComponent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: ${({ theme }) => theme.space.sm} 0;
  gap: ${({ theme }) => theme.space.sm};
`;

export const AnchorButtons = ({
  bug,
  scrollerBoxId,
}: {
  bug: GetCampaignsByCidBugsAndBidApiResponse;
  scrollerBoxId?: string;
}) => {
  const { media } = bug;
  const { openAccordions, setOpenAccordions } = useBugPreviewContext();

  return (
    <FlexComponent>
      {media && media.length && (
        <Link
          to="bug-preview-attachments"
          containerId={scrollerBoxId || 'main'}
          smooth
          duration={500}
          offset={-50}
        >
          <IconButton size="small">
            <AttachmentsIcon />
          </IconButton>
        </Link>
      )}

      <Link
        to="bug-preview-details"
        containerId={scrollerBoxId || 'main'}
        smooth
        duration={500}
        offset={-50}
        onClick={() => {
          setOpenAccordions([...openAccordions, 'details']);
        }}
      >
        <IconButton size="small">
          <DetailsIcon />
        </IconButton>
      </Link>

      <Link
        to="bug-preview-duplicates"
        containerId={scrollerBoxId || 'main'}
        smooth
        duration={500}
        offset={-50}
        onClick={() => {
          setOpenAccordions([...openAccordions, 'duplicates']);
        }}
      >
        <IconButton size="small">
          <LinkIcon />
        </IconButton>
      </Link>
    </FlexComponent>
  );
};
