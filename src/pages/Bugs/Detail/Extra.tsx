import { useTranslation } from 'react-i18next';
import { BugMedia as BugMediaType } from 'src/features/api';
import { theme as globalTheme } from 'src/app/theme';
import { Ellipsis, SM, Span } from '@appquality/unguess-design-system';
import { ReactComponent as AttachmentsIcon } from 'src/assets/icons/attachments-icon.svg';
import { BugCard } from 'src/pages/Campaign/widgets/BugCard';
import styled from 'styled-components';

const StyledBugCard = styled(BugCard)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
`;

const BugCardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

// TODO: Set the correct icon for each extension
function getFileIcon(extension: string, size: number) {
  return (
    <AttachmentsIcon
      style={{ width: size, marginRight: globalTheme.space.xs }}
    />
  );
}

export default ({ items }: { items: BugMediaType[] }) => {
  const { t } = useTranslation();
  const iconSize = 12;

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
            <>
              <BugCard.TopTitle>
                {item.mime_type.extension.toUpperCase()}
              </BugCard.TopTitle>
              <BugCard.Title url={item.url}>
                <BugCardContent>
                  {getFileIcon(item.mime_type.type, iconSize)}
                  <Ellipsis style={{ width: `calc(100% - ${iconSize * 2}px)` }}>
                    {/* {item.url} */}
                    <Span>File Extra {index + 1}</Span>
                  </Ellipsis>
                </BugCardContent>
              </BugCard.Title>
            </>
          )}
        </StyledBugCard>
      ))}
    </>
  );
};
