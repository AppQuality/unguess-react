import { TFunction } from 'react-i18next';
import { theme as globalTheme } from 'src/app/theme';
import { Tag } from 'src/common/Tag';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { Pipe } from 'src/common/components/Pipe';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { ReactComponent as FatherIcon } from 'src/assets/icons/bug-type-unique.svg';
import { BugTitle } from '../components/BugTitle';
import { TableBugType } from '../../../types';

export const mapBugsToTableData = (bugs: TableBugType[], t: TFunction) => {
  const currentBugId = getSelectedBugId();
  if (!bugs) return [];
  return bugs.map((bug) => {
    const isPillBold = (currentBugId && currentBugId === bug.id) || !bug.read;
    return {
      key: bug.id.toString(),
      id: bug.id.toString(),
      siblings: (
        <Tag hue="rgba(0,0,0,0)" isRegular={!isPillBold}>
          {!bug.duplicated_of_id && (
            <Tag.Avatar>
              <FatherIcon />
            </Tag.Avatar>
          )}
          {bug.siblings > 0 && `+${bug.siblings}`}
        </Tag>
      ),
      bugId: (
        <span style={{ color: globalTheme.palette.grey[700] }}>
          {bug.id.toString()}
        </span>
      ),
      severity: (
        <SeverityTag
          hasBackground
          severity={bug.severity.name.toLowerCase() as Severities}
        />
      ),
      title: (
        <div>
          <BugTitle isUnread={!bug.read} isBold={isPillBold}>
            {bug.title.compact}
          </BugTitle>
          {bug.title.context &&
            bug.title.context.map((context) => (
              <Tag isRegular={!isPillBold}>{context}</Tag>
            ))}
          {bug.type.name && (
            <>
              <Pipe size="small" />
              <Tag
                isRegular={!isPillBold}
                style={{ marginLeft: globalTheme.space.xs }}
              >
                {bug.type.name}
              </Tag>
            </>
          )}
          {!bug.read && (
            <>
              <Pipe size="small" />
              <Tag hue="rgba(0, 0, 0, 0)" color={globalTheme.palette.blue[600]}>
                {t('__PAGE_BUGS_UNREAD_PILL', 'Unread')}
              </Tag>
            </>
          )}
        </div>
      ),
      isHighlighted: !bug.read,
      created: bug.created,
      updated: bug.updated,
      borderColor:
        globalTheme.colors.bySeverity[
          bug.severity.name.toLowerCase() as Severities
        ],
    };
  });
};
