import { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { IconButton } from '@appquality/unguess-design-system';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';
import { ReactComponent as AttachmentsIcon } from 'src/assets/icons/attachments-icon.svg';
import { ReactComponent as DetailsIcon } from 'src/assets/icons/details-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/linked.svg';

const FlexComponent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: ${({ theme }) => theme.space.sm} 0;
  gap: ${({ theme }) => theme.space.sm};
`;

const AnchorButtons = ({
  bug,
  scrollerBoxId,
}: {
  bug: GetCampaignsByCidBugsAndBidApiResponse;
  scrollerBoxId?: string;
}): ReactElement => {
  const { media } = bug;

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
      >
        <IconButton size="small">
          <LinkIcon />
        </IconButton>
      </Link>
    </FlexComponent>
  );
};

export default AnchorButtons;
