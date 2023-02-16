import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { ReactComponent as AttachmentIcon } from 'src/assets/icons/media-icon.svg';
import { ReactComponent as BugDetailsIcon } from 'src/assets/icons/details-bullets-icon.svg';
import { ReactComponent as BugDuplicatesIcon } from 'src/assets/icons/link-icon.svg';
import { IconButton } from '@appquality/unguess-design-system';
import { Link } from 'react-scroll';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';

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
            <AttachmentIcon />
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
          <BugDetailsIcon />
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
          <BugDuplicatesIcon />
        </IconButton>
      </Link>
    </FlexComponent>
  );
};

export default AnchorButtons;
