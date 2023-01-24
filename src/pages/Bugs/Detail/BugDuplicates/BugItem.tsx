import { BugCard } from 'src/pages/Campaign/widgets/BugCard';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { Pill } from 'src/common/components/pills/Pill';
import { Span } from '@appquality/unguess-design-system';
import { ReactComponent as FatherIcon } from './icons/father.svg';
import { ReactComponent as SiblingIcon } from './icons/sibling.svg';

const StyledBugCard = styled(BugCard)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: default;
`;
const BugCardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const BugCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
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
        {isFather ? <FatherIcon /> : <SiblingIcon />}
        <BugCardInfo style={{ marginLeft: globalTheme.space.sm }}>
          <BugCard.TopTitle>ID {bugId}</BugCard.TopTitle>
          <BugCard.Title>
            <BugCardContent>
              <Span>{title}</Span>
            </BugCardContent>
          </BugCard.Title>
          {pills ? (
            <BugCard.Footer>
              {pills.map((pill) => (
                <Pill>{pill}</Pill>
              ))}
            </BugCard.Footer>
          ) : null}
        </BugCardInfo>
      </>
    )}
  </StyledBugCard>
);
