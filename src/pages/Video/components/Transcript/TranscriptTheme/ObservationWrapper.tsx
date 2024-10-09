import { Tooltip } from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import { ObservationTooltip } from '../../ObservationTooltip';

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

const ObservationWrapper = ({
  title,
  color,
  children,
  observations,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
  observations: {
    id: number;
    title: string;
    color: string;
  }[];
}) => {
  const background = `${color}33`;
  return (
    <span
      data-title={title}
      style={{
        background,
        display: 'inline-block',
        color,
        fontWeight: '500',
      }}
    >
      <Tooltip
        size="medium"
        isTransparent
        content={
          <TagWrapper>
            {observations.map((o) => (
              <div>
                <ObservationTooltip
                  observationId={o.id}
                  color={o.color}
                  label={o.title}
                />
              </div>
            ))}
          </TagWrapper>
        }
      >
        <span>{children}</span>
      </Tooltip>
    </span>
  );
};

export default ObservationWrapper;
