import {
  Accordion,
  IconButton,
  LG,
  Notification,
  SM,
  Title,
  Tooltip,
  useToast,
} from '@appquality/unguess-design-system';
import {
  GetVideosByVidApiResponse,
  GetVideosByVidObservationsApiResponse,
} from 'src/features/api';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import { ReactComponent as CopyIcon } from 'src/assets/icons/link-fill.svg';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { appTheme } from 'src/app/theme';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { styled } from 'styled-components';
import { getColorWithAlpha } from 'src/common/utils';
import { formatDuration } from 'src/pages/Videos/utils/formatDuration';
import { ObservationForm } from './ObservationForm';
import { useVideoContext } from '../context/VideoContext';

const Circle = styled.div<{
  color: string;
}>`
  width: 20px;
  height: 20px;
  margin-right: ${({ theme }) => theme.space.sm};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;
const StyledTitle = styled(Title)`
  display: flex;
  align-items: center;
`;

const Observation = ({
  observation,
  refScroll,
  transcript,
}: {
  observation: GetVideosByVidObservationsApiResponse[number];
  refScroll: React.RefObject<HTMLDivElement>;
  transcript?: GetVideosByVidApiResponse['transcript'];
}) => {
  const { title, start, end } = observation;
  const [isOpen, setIsOpen] = useState(false);
  const { openAccordion, setOpenAccordion } = useVideoContext();
  const { campaignId, videoId } = useParams();
  const pageUrl = useLocalizeRoute(
    `campaigns/${campaignId}/videos/${videoId}/`
  );
  const { addToast } = useToast();
  const { t } = useTranslation();

  const quots = transcript?.paragraphs
    .flatMap((paragraph) =>
      paragraph.words.filter(
        (w) => w.start >= observation.start && w.end <= observation.end
      )
    )
    .map((w) => w.word)
    .join(' ');

  const handleAccordionChange = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setOpenAccordion(undefined);
    }
  };

  const copyLink = useCallback(
    (anchor: string, event: React.MouseEvent) => {
      event.stopPropagation();
      navigator.clipboard.writeText(
        `${window.location.origin}${pageUrl}#${anchor}`
      );
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t('__VIDEO_PAGE_OBSERVATION_LINK_TOAST_MESSAGE')}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    },
    [observation]
  );

  const handleSubmit = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (openAccordion !== undefined) {
      if (openAccordion.id === observation.id) {
        setIsOpen(true);

        // Set scrolling container position to active element
        setTimeout(() => {
          if (!refScroll.current) {
            return;
          }

          const activeElement = document.getElementById(
            `video-observation-accordion-${openAccordion.id}`
          );
          if (activeElement) {
            refScroll.current.scrollTo({
              top: activeElement.offsetTop,
              behavior: 'smooth',
            });
          }
          setOpenAccordion(undefined);
        }, 100);
      }
    }
  }, [openAccordion]);

  // Check if url has an anchor and scroll to it
  useEffect(() => {
    const url = window.location.href;
    const urlAnchor = url.split('#')[1];
    if (urlAnchor) {
      const observationId = parseInt(urlAnchor.replace('observation-', ''), 10);
      if (observationId) {
        setOpenAccordion({ id: observationId });
      }
      const anchor = document.getElementById(urlAnchor);
      const main = document.getElementById('main');
      if (anchor && main) {
        main.scroll({
          top: anchor.offsetTop,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  return (
    <Accordion
      level={3}
      style={{ padding: 0, marginBottom: appTheme.space.md }}
      key={`observation_accordion_${observation.id}_${isOpen}`}
      defaultExpandedSections={isOpen ? [0, 1] : []}
      onChange={handleAccordionChange}
      id={`video-observation-accordion-${observation.id}`}
    >
      <Accordion.Section>
        <Accordion.Header>
          <Accordion.Label style={{ padding: 0 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Circle
                color={
                  observation.tags.find(
                    (tag) => tag.group.name.toLowerCase() === 'severity'
                  )?.tag.style || appTheme.palette.grey[600]
                }
                style={{
                  backgroundColor: getColorWithAlpha(
                    observation.tags.find(
                      (tag) => tag.group.name.toLowerCase() === 'severity'
                    )?.tag.style || appTheme.palette.grey[600],
                    0.1
                  ),
                }}
              >
                <TagIcon
                  style={{
                    color:
                      observation.tags.find(
                        (tag) => tag.group.name.toLowerCase() === 'severity'
                      )?.tag.style || appTheme.palette.grey[600],
                  }}
                />
              </Circle>
              <div>
                <StyledTitle>
                  <LG isBold>{title} </LG>
                </StyledTitle>
              </div>
              <Tooltip
                content={t('__VIDEO_PAGE_OBSERVATION_LINK_TOOLTIP')}
                size="large"
                type="light"
                placement="bottom-start"
                hasArrow={false}
              >
                <IconButton
                  size="small"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: appTheme.space.sm,
                  }}
                  onClick={(event) =>
                    copyLink(`observation-${observation.id}`, event)
                  }
                >
                  <CopyIcon style={{ width: 14, height: 14 }} />
                </IconButton>
              </Tooltip>
            </div>
            <SM
              style={{
                color: appTheme.palette.grey[600],
                marginTop: appTheme.space.xs,
                marginLeft: appTheme.space.lg,
              }}
            >
              {formatDuration(start)} - {formatDuration(end)}
            </SM>
          </Accordion.Label>
        </Accordion.Header>
        <Accordion.Panel style={{ padding: 0 }}>
          <ObservationForm
            observation={observation}
            onSubmit={handleSubmit}
            {...(quots && { quots })}
          />
        </Accordion.Panel>
      </Accordion.Section>
    </Accordion>
  );
};

export { Observation };
