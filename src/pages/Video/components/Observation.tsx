import { Accordion, LG, SM, Title } from '@appquality/unguess-design-system';
import {
  GetVideosByVidApiResponse,
  GetVideosByVidObservationsApiResponse,
} from 'src/features/api';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import { useEffect, useState } from 'react';
import { appTheme } from 'src/app/theme';
import { styled } from 'styled-components';
import { getColorWithAlpha } from 'src/common/utils';
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

  const quots = transcript?.paragraphs
    .flatMap((paragraph) =>
      paragraph.words.filter(
        (w) => w.start >= observation.start && w.end <= observation.end
      )
    )
    .map((w) => w.word)
    .join(' ');

  const formatTime = (time: number) => {
    const date = new Date(0);
    date.setSeconds(time);
    return date.toISOString().slice(11, 19);
  };

  const handleAccordionChange = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setOpenAccordion(undefined);
    }
  };

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
                <Title>
                  <LG isBold>{title}</LG>
                </Title>
                <SM
                  style={{
                    color: appTheme.palette.grey[600],
                    marginTop: appTheme.space.xs,
                  }}
                >
                  {formatTime(start)} - {formatTime(end)}
                </SM>
              </div>
            </div>
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
