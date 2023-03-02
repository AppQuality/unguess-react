import { SM, Tag, Tooltip } from '@appquality/unguess-design-system';
import { TFunction } from 'react-i18next';
import { theme as globalTheme } from 'src/app/theme';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { Pipe } from 'src/common/components/Pipe';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { ReactComponent as FatherIcon } from 'src/assets/icons/bug-type-unique.svg';
import { PriorityIcon } from 'src/common/components/PriorityIcon';
import { BugTitle } from '../components/BugTitle';
import { TableBugType } from '../../../types';

export const mapBugsToTableData = (bugs: TableBugType[], t: TFunction) => {
  const currentBugId = getSelectedBugId();
  if (!bugs) return [];
  return bugs.map((oldBug) => {
    const isPillBold =
      (currentBugId && currentBugId === oldBug.id) || !oldBug.read;
    const bug = { ...oldBug, priority: { name: 'whatever', id: 2 } };
    return {
      key: bug.id.toString(),
      id: bug.id.toString(),
      siblings: (
        <Tag isPill={false} hue="rgba(0,0,0,0)" isRegular={!isPillBold}>
          {!bug.duplicated_of_id && (
            <Tag.Avatar>
              <FatherIcon />
            </Tag.Avatar>
          )}
          {bug.siblings > 0 && `+${bug.siblings}`}
        </Tag>
      ),
      bugId: (
        <SM tag="span" isBold={isPillBold}>
          {bug.id.toString()}
        </SM>
      ),
      priority: (
        <Tooltip content={bug.priority.name} placement="auto" type="light">
          <span>
            <PriorityIcon priority={bug.priority.name} />
          </span>
        </Tooltip>
      ),
      severity: (
        <SeverityTag
          hasBackground
          isRegular={!isPillBold}
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
