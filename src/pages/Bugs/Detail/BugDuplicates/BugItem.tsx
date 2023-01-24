import { BugCard } from 'src/common/components/BugCard/BugCardWithIcon';
import { theme as globalTheme } from 'src/app/theme';
import { Pill } from 'src/common/components/pills/Pill';
import { Span } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { ReactComponent as FatherIcon } from './icons/father.svg';
import { ReactComponent as SiblingIcon } from './icons/sibling.svg';

const StyledBugCard = styled(BugCard)`
  cursor: default;
`;

export const BugItem = ({
  isFather,
  bugId,
  title,
  pills,
}: {
  isFather?: boolean;
  bugId: number;
  title: string;
  pills: string[];
}) => (
  <StyledBugCard borderColor={globalTheme.palette.grey[500]}>
    {() => (
      <>
        <BugCard.IconBox>
          {isFather ? <FatherIcon /> : <SiblingIcon />}
        </BugCard.IconBox>
        <BugCard.Info style={{ marginLeft: globalTheme.space.sm }}>
          <BugCard.TopTitle>ID {bugId}</BugCard.TopTitle>
          <BugCard.Title>
            <BugCard.Content>
              <Span>{title}</Span>
            </BugCard.Content>
          </BugCard.Title>
          {pills ? (
            <BugCard.Footer>
              {pills.map((pill) => (
                <Pill>{pill}</Pill>
              ))}
            </BugCard.Footer>
          ) : null}
        </BugCard.Info>
      </>
    )}
  </StyledBugCard>
);
