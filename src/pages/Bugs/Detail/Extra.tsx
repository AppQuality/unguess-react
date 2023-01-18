import { useTranslation } from 'react-i18next';
import { BugMedia as BugMediaType } from 'src/features/api';
import { theme as globalTheme } from 'src/app/theme';
import { SM, Span } from '@appquality/unguess-design-system';
import { ReactComponent as ArchiveIcon } from 'src/assets/icons/extra-icon-archive.svg';
import { ReactComponent as FileIcon } from 'src/assets/icons/extra-icon-file.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/extra-icon-link.svg';
import { ReactComponent as PdfIcon } from 'src/assets/icons/extra-icon-pdf.svg';
import { ReactComponent as VideoIcon } from 'src/assets/icons/extra-icon-video.svg';
import { BugCard } from 'src/pages/Campaign/widgets/BugCard';
import styled from 'styled-components';

const StyledBugCard = styled(BugCard)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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

function getFileSpecs(extension: string): {
  icon: React.ReactNode;
  color: string;
} {
  switch (extension.toLowerCase()) {
    case 'pdf':
      return {
        icon: <PdfIcon />,
        color: globalTheme.palette.red[400],
      };
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
    case 'ppt':
    case 'pptx':
    case 'txt':
    case 'csv':
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'svg':
      return {
        icon: <FileIcon />,
        color: globalTheme.palette.green[600],
      };
    case 'zip':
    case 'rar':
    case 'tar':
    case 'gz':
      return {
        icon: <ArchiveIcon />,
        color: globalTheme.palette.fuschia[600],
      };
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'wmv':
      return {
        icon: <VideoIcon />,
        color: globalTheme.palette.yellow[600],
      };
    default:
      return {
        icon: <LinkIcon />,
        color: globalTheme.palette.azure[400],
      };
  }
}

export default ({ items }: { items: BugMediaType[] }) => {
  const { t } = useTranslation();

  // Array with keys with types and values with counts
  const counts = items.reduce((acc, item) => {
    const { extension } = item.mime_type;
    if (acc[extension as string]) {
      acc[extension as string] += 1;
    } else {
      acc[extension as string] = 1;
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
            {counts[type as string]} {type}
          </span>
        ))}
      </SM>
      {items.map((item, index) => (
        <StyledBugCard
          borderColor={getFileSpecs(item.mime_type.extension).color}
        >
          {() => (
            <>
              {getFileSpecs(item.mime_type.extension).icon}
              <BugCardInfo style={{ marginLeft: globalTheme.space.sm }}>
                <BugCard.TopTitle>
                  {item.mime_type.extension.toUpperCase()}
                </BugCard.TopTitle>
                <BugCard.Title url={item.url}>
                  <BugCardContent>
                    <Span>
                      {t(
                        '__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_EXTRA_TAB_ITEM_LABEL'
                      )}{' '}
                      {index + 1}
                    </Span>
                  </BugCardContent>
                </BugCard.Title>
              </BugCardInfo>
            </>
          )}
        </StyledBugCard>
      ))}
    </>
  );
};
