import { TFunction } from 'react-i18next';
import { theme } from 'src/app/theme';
import { Pill } from 'src/common/components/pills/Pill';
import { SeverityPill } from 'src/common/components/pills/SeverityPill';
import { Pipe } from 'src/common/components/Pipe';
import { GetCampaignsByCidBugsApiResponse } from 'src/features/api';
import { BugTitle } from './BugTitle';

export const mapBugsToTableData = (
  bugs: GetCampaignsByCidBugsApiResponse['items'],
  t: TFunction
) => {
  if (!bugs) return [];
  return bugs.map((bug) => ({
    id: bug.id.toString(),
    bugId: (
      <span style={{ color: theme.palette.grey[700] }}>
        {bug.id.toString()}
      </span>
    ),
    severity: (
      <SeverityPill severity={bug.severity.name.toLowerCase() as Severities} />
    ),
    title: (
      <div>
        <BugTitle isUnread={!bug.read}>{bug.title.compact}</BugTitle>
        {bug.title.context && (
          <Pill isBold={!bug.read}>{bug.title.context}</Pill>
        )}
        {bug.tags?.map((tag) => (
          <Pill isBold={!bug.read}>{tag.tag_name}</Pill>
        ))}
        {bug.type.name && (
          <>
            <Pipe size="small" />
            <Pill isBold style={{ marginLeft: theme.space.xs }}>
              {bug.type.name}
            </Pill>
          </>
        )}
        {!bug.read && (
          <>
            <Pipe size="small" />
            <Pill
              isBold
              backgroundColor="transparent"
              color={theme.palette.blue[600]}
            >
              {t('__PAGE_BUGS_UNREAD_PILL', 'Unread')}
            </Pill>
          </>
        )}
      </div>
    ),
    isHighlighted: !bug.read,
    created: bug.created,
    updated: bug.updated,
    borderColor:
      theme.colors.bySeverity[bug.severity.name.toLowerCase() as Severities],
  }));
};
