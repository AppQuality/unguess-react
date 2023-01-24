import { BugCard as OriginalBugCard } from 'src/common/components/BugCard';
import styled from 'styled-components';

const StyledBugCard = styled(OriginalBugCard)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const BugCard = (props: Parameters<typeof OriginalBugCard>[0]) => (
  <StyledBugCard {...props} />
);

const BugCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
BugCard.Info = BugCardInfo;

BugCard.TopTitle = OriginalBugCard.TopTitle;
BugCard.Title = OriginalBugCard.Title;

const BugCardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
BugCard.Content = BugCardContent;

const IconBox = styled.div`
  min-width: 6.5%;
  align-self: flex-start;
  margin-top: 3%;

  svg {
    max-width: 100%;
  }
`;
BugCard.IconBox = IconBox;

BugCard.Footer = OriginalBugCard.Footer;
export { BugCard };
