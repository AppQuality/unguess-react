import { useTranslation } from 'react-i18next';
import { BugMedia as BugMediaType } from 'src/features/api';
import { appTheme } from 'src/app/theme';
import { Span, TextLabel } from '@appquality/unguess-design-system';
import { ReactComponent as ArchiveIcon } from 'src/assets/icons/extra-icon-archive.svg';
import { ReactComponent as FileIcon } from 'src/assets/icons/extra-icon-file.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/extra-icon-link.svg';
import { ReactComponent as PdfIcon } from 'src/assets/icons/extra-icon-pdf.svg';
import { ReactComponent as VideoIcon } from 'src/assets/icons/extra-icon-video.svg';
import { BugCard } from 'src/common/components/BugCard/BugCardWithIcon';

function getFileSpecs(extension: string): {
  icon: React.ReactNode;
  color: string;
} {
  switch (extension.toLowerCase()) {
    case 'pdf':
      return {
        icon: <PdfIcon />,
        color: appTheme.palette.red[400],
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
        color: appTheme.palette.green[600],
      };
    case 'zip':
    case 'rar':
    case 'tar':
    case 'gz':
      return {
        icon: <ArchiveIcon />,
        color: appTheme.palette.fuschia[600],
      };
    case 'mp4':
    case 'mov':
    case 'avi':
    case 'wmv':
      return {
        icon: <VideoIcon />,
        color: appTheme.palette.yellow[600],
      };
    default:
      return {
        icon: <LinkIcon />,
        color: appTheme.palette.azure[400],
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
      <TextLabel
        style={{
          marginBottom: appTheme.space.md,
        }}
      >
        {Object.keys(counts).map((type, index) => (
          <span key={type}>
            {index > 0 && ' - '}
            {counts[type as string]} {type}
          </span>
        ))}
      </TextLabel>
      {items.map((item, index) => (
        <BugCard
          borderColor={getFileSpecs(item.mime_type.extension).color}
          url={item.url}
        >
          {() => (
            <>
              {getFileSpecs(item.mime_type.extension).icon}
              <BugCard.Info style={{ marginLeft: appTheme.space.sm }}>
                <BugCard.TopTitle>
                  {item.mime_type.extension.toUpperCase()}
                </BugCard.TopTitle>
                <BugCard.Title>
                  <BugCard.Content>
                    <Span>
                      {t(
                        '__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_EXTRA_TAB_ITEM_LABEL'
                      )}{' '}
                      {index + 1}
                    </Span>
                  </BugCard.Content>
                </BugCard.Title>
              </BugCard.Info>
            </>
          )}
        </BugCard>
      ))}
    </>
  );
};
