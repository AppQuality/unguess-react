import { useTranslation } from 'react-i18next';
import { BugMedia as BugMediaType } from 'src/features/api';
import { theme as globalTheme } from 'src/app/theme';
import { SM, Span } from '@appquality/unguess-design-system';
import { ReactComponent as AttachmentsIcon } from 'src/assets/icons/attachments-icon.svg';
import { BugCard } from 'src/pages/Campaign/widgets/BugCard';
import styled from 'styled-components';

const StyledBugCard = styled(BugCard)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
`;

function getFileIcon(extension: string) {
  return <AttachmentsIcon />;
}

export default ({ items }: { items: BugMediaType[] }) => {
  const { t } = useTranslation();

  // Create an array with keys with types and values with counts
  const counts = items.reduce((acc, item) => {
    const { extension } = item.mime_type;
    if (acc[extension]) {
      acc[extension] += 1;
    } else {
      acc[extension] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  return (
    <>
      <SM
        style={{
          color: globalTheme.palette.grey[600],
          marginBottom: globalTheme.space.md,
        }}
      >
        {Object.keys(counts).map((type, index) => (
          <span key={type}>
            {Object.keys(counts).length - 1 !== index && ' - '}
            {counts[type]} {type}
          </span>
        ))}
      </SM>
      {/* 
        TODO: 
        - handle new color from common component BugCard for "severity"
        - handle icon from common component BugCard
      */}
      {items.map((item, index) => (
        <StyledBugCard severity="low">
          {() => (
            <BugCard.Title url={item.url}>
              {getFileIcon(item.mime_type.type)}
              <Span style={{ marginLeft: globalTheme.space.sm }}>
                Item extra {index + 1} {/* TODO: Change this hardcoded text */}
              </Span>
            </BugCard.Title>
          )}
        </StyledBugCard>
      ))}
    </>
  );
};
