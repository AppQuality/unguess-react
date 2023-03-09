import { SM, Tag } from '@appquality/unguess-design-system';
import { TFunction } from 'react-i18next';
import { theme as globalTheme } from 'src/app/theme';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { Pipe } from 'src/common/components/Pipe';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { ReactComponent as FatherIcon } from 'src/assets/icons/bug-type-unique.svg';
import { Meta } from 'src/common/components/Meta';
import styled from 'styled-components';
import { BugTitle } from '../components/BugTitle';
import { TableBugType } from '../../../types';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

export const mapBugsToTableData = (bugs: TableBugType[], t: TFunction) => {
  const currentBugId = getSelectedBugId();
  if (!bugs) return [];
  return bugs.map((bug) => {
    const isPillBold = (currentBugId && currentBugId === bug.id) || !bug.read;
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
      severity: (
        <SeverityTag
          hasBackground
          isRegular={!isPillBold}
          severity={bug.severity.name.toLowerCase() as Severities}
        />
      ),
      title: (
        <TitleWrapper>
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
              <Tag isRegular={!isPillBold}>{bug.type.name}</Tag>
            </>
          )}
          {!bug.read && (
            <>
              <Pipe size="small" />
              <Meta color={globalTheme.palette.blue[600]}>
                {t('__PAGE_BUGS_UNREAD_PILL', 'Unread')}
              </Meta>
            </>
          )}
        </TitleWrapper>
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
