import { IconButton, Tooltip } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ReactComponent as AttachmentsIcon } from 'src/assets/icons/attachments-icon.svg';
import { ReactComponent as DetailsIcon } from 'src/assets/icons/details-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/linked.svg';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';
import { useBugPreviewContext } from 'src/pages/Bugs/Content/context/BugPreviewContext';
import styled from 'styled-components';

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
  const { t } = useTranslation();

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
          <Tooltip
            content={t('__BUGS_PREVIEW_MEDIA_TOOLTIP_TEXT')}
            placement="bottom"
            type="light"
            size="medium"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <IconButton size="small">
              <AttachmentsIcon />
            </IconButton>
          </Tooltip>
        </Link>
      )}

      <Link
        to="bug-preview-details"
        containerId={scrollerBoxId || 'main'}
        smooth
        duration={500}
        offset={0}
        onClick={() => {
          setOpenAccordions([...openAccordions, 'details']);
        }}
      >
        <Tooltip
          content={t('__BUGS_PREVIEW_TAG_TOOLTIP_TEXT')}
          placement="bottom"
          type="light"
          size="medium"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IconButton size="small">
            <DetailsIcon />
          </IconButton>
        </Tooltip>
      </Link>

      <Link
        to="bug-preview-duplicates"
        containerId={scrollerBoxId || 'main'}
        smooth
        duration={500}
        offset={0}
        onClick={() => {
          setOpenAccordions([...openAccordions, 'duplicates']);
        }}
      >
        <Tooltip
          content={t('__BUGS_PREVIEW_RELATED_BUGS_TOOLTIP_TEXT')}
          placement="bottom"
          type="light"
          size="medium"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IconButton size="small">
            <LinkIcon />
          </IconButton>
        </Tooltip>
      </Link>
    </FlexComponent>
  );
};
