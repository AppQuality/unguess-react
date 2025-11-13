import {
  AccordionNew,
  IconButton,
  Notification,
  Tooltip,
  useToast,
} from '@appquality/unguess-design-system';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import { Divider } from 'src/common/components/divider';
import { getColorWithAlpha } from 'src/common/utils';
import {
  GetVideosByVidApiResponse,
  GetVideosByVidObservationsApiResponse,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { formatDuration } from 'src/pages/Videos/utils/formatDuration';
import { styled } from 'styled-components';
import { useVideoContext } from '../context/VideoContext';
import { ObservationForm } from './ObservationForm';

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

const Observation = ({
  observation,
  refScroll,
  transcript,
}: {
  observation: GetVideosByVidObservationsApiResponse[number];
  refScroll: React.RefObject<HTMLDivElement>;
  transcript?: GetVideosByVidApiResponse['transcript'];
}) => {
  const { tags, start, end } = observation;
  const [isOpen, setIsOpen] = useState(false);
  const { openAccordion, setOpenAccordion } = useVideoContext();
  const { campaignId, videoId } = useParams();
  const pageUrl = useLocalizeRoute(
    `campaigns/${campaignId}/videos/${videoId}/`
  );
  const { addToast } = useToast();
  const { t } = useTranslation();

  const title = tags.find((tag) => tag.group.name.toLowerCase() === 'title')
    ?.tag.name;

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
              top: activeElement.offsetTop - 150, // account for header height
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
    <>
      <Divider style={{ margin: `${appTheme.space.sm} auto` }} />
      <AccordionNew
        level={3}
        expandedSections={isOpen ? [0, 1] : []}
        onChange={handleAccordionChange}
        key={`observation_accordion_${observation.id}_${isOpen}`}
        id={`video-observation-accordion-${observation.id}`}
        data-qa={`observation-accordion-${observation.id}`}
      >
        <AccordionNew.Section>
          <AccordionNew.Header
            icon={
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
            }
          >
            <AccordionNew.Label
              label={title}
              subtitle={`${formatDuration(start)} - ${formatDuration(end)}`}
            />
            <AccordionNew.Meta
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Tooltip
                content={t('__VIDEO_PAGE_OBSERVATION_LINK_TOOLTIP')}
                size="large"
                type="light"
                placement="bottom-start"
                hasArrow={false}
              >
                <IconButton
                  size="small"
                  onClick={(event) =>
                    copyLink(`observation-${observation.id}`, event)
                  }
                >
                  <LinkIcon />
                </IconButton>
              </Tooltip>
            </AccordionNew.Meta>
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <ObservationForm
              observation={observation}
              onSubmit={handleSubmit}
              paragraphs={transcript?.paragraphs}
            />
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
    </>
  );
};

export { Observation };
