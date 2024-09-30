import { Tag, Tooltip } from '@appquality/unguess-design-system';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import { styled } from 'styled-components';

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
                <Tag size="large" hue={o.color} color="white">
                  <TagIcon /> {o.title}
                </Tag>
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
