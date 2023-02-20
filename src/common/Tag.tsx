import { Tag as ZendeskTag, theme } from '@appquality/unguess-design-system';
import { TagArgs } from '@appquality/unguess-design-system/build/stories/tags/_types';
import styled from 'styled-components';

const StyledAvatar = styled(ZendeskTag.Avatar)``;
const StyledClose = styled(ZendeskTag.Close)``;

const StyledTag = styled(ZendeskTag)<TagArgs>`
  margin-right: ${(p) => p.theme.space.xs};
  &:last-of-type {
    margin-right: 0;
  }
  ${(p) =>
    p.color &&
    `
      color: ${p.color};
      ${StyledClose} {
         color: ${p.color};
      }
      &:hover {
        color: ${p.color};
         ${StyledClose} {
            color: ${p.color};
         }
      }
   `}
  ${StyledAvatar} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Tag = ({
  isPill = true,
  hue = theme.palette.grey[200],
  color = theme.palette.grey[700],
  ...props
}: TagArgs) => (
  <StyledTag
    isPill={props.isRound ? false : isPill}
    hue={hue}
    color={color}
    {...props}
  />
);

Tag.Avatar = StyledAvatar;
Tag.Close = StyledClose;

export { Tag };
