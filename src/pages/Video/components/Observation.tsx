import { Accordion, LG, SM, Title } from '@appquality/unguess-design-system';
import { GetVideoByVidObservationsApiResponse } from 'src/features/api';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import { useState } from 'react';
import { appTheme } from 'src/app/theme';
import { styled } from 'styled-components';
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
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    opacity: 0.08;
  }
`;

const Observation = ({
  observation,
}: {
  observation: GetVideoByVidObservationsApiResponse[number];
}) => {
  const { title, start, end } = observation;
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (time: number) => {
    const date = new Date(0);
    date.setSeconds(time);
    return date.toISOString().slice(11, 19);
  };

  const handleAccordionChange = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {};

  return (
    <Accordion
      level={3}
      style={{ padding: 0, marginBottom: appTheme.space.md }}
      key={`observation_accordion_${observation.id}_${isOpen}`}
      defaultExpandedSections={isOpen ? [0, 1] : []}
      onChange={handleAccordionChange}
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
            onDelete={handleDelete}
          />
        </Accordion.Panel>
      </Accordion.Section>
    </Accordion>
  );
};

export { Observation };
