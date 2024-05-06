import { Accordion, LG, SM, Title } from '@appquality/unguess-design-system';
import { GetVideoByVidObservationsApiResponse } from 'src/features/api';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import { useState } from 'react';
import { appTheme } from 'src/app/theme';
import { ObservationForm } from './ObservationForm';

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

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Accordion
      level={3}
      style={{ padding: 0, marginBottom: appTheme.space.md }}
      key={`details_accordion_${isOpen}`}
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
              <TagIcon
                style={{
                  marginRight: appTheme.space.sm,
                  color: appTheme.palette.green[600],
                }}
              />
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
            onCancel={handleCancel}
          />
        </Accordion.Panel>
      </Accordion.Section>
    </Accordion>
  );
};

export { Observation };
