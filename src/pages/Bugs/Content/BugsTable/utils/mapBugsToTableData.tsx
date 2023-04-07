import { SM, Tag, Tooltip } from '@appquality/unguess-design-system';
import { TFunction } from 'react-i18next';
import { theme as globalTheme } from 'src/app/theme';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { Pipe } from 'src/common/components/Pipe';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { ReactComponent as FatherIcon } from 'src/assets/icons/bug-type-unique.svg';
import { Meta } from 'src/common/components/Meta';
import styled from 'styled-components';
import { getPriorityInfo } from 'src/common/components/utils/getPriorityInfo';
import { TextAlign } from 'src/common/components/Table';
import { BugTitle } from '../components/BugTitle';
import { TableBugType } from '../../../types';

const AlignmentDiv = styled.div`
  height: 2em;
  display: flex;
  justify-content: ${(props: { alignment?: TextAlign }) =>
    props.alignment || 'center'};
  align-items: center;
`;

const CustomTag = styled(Tag)`
  height: max-content;
  display: grid;
  grid-template-columns: repeat(2, 16px);
  grid-template-rows: 16px;
  grid-gap: calc(16px / 4);
  justify-content: center;
  align-items: center;

  svg {
    margin: 0 !important;
  }
`;

export const mapBugsToTableData = (bugs: TableBugType[], t: TFunction) => {
  const currentBugId = getSelectedBugId();

  if (!bugs) return [];
  return bugs.map((bug) => {
    const isPillBold = (currentBugId && currentBugId === bug.id) || !bug.read;
    const { priority: bugPriority } = bug;

    return {
      key: bug.id.toString(),
      id: bug.id.toString(),
      siblings: (
        <AlignmentDiv alignment="center">
          <CustomTag isPill={false} hue="rgba(0,0,0,0)" isRegular={!isPillBold}>
            {!bug.duplicated_of_id && (
              <Tag.Avatar>
                <FatherIcon />
              </Tag.Avatar>
            )}
            {bug.siblings > 0 && `+${bug.siblings}`}
          </CustomTag>
        </AlignmentDiv>
      ),
      bugId: (
        <AlignmentDiv alignment="end">
          <SM tag="span" isBold={isPillBold}>
            {bug.id.toString()}
          </SM>
        </AlignmentDiv>
      ),
      priority: (
        <AlignmentDiv alignment="center">
          <Tooltip
            content={getPriorityInfo(bugPriority?.name as Priority, t).text}
            placement="bottom"
            type="light"
            size="medium"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span style={{ height: '1em' }}>
              {getPriorityInfo(bugPriority?.name as Priority, t).icon}
            </span>
          </Tooltip>
        </AlignmentDiv>
      ),
      severity: (
        <AlignmentDiv alignment="center">
          <SeverityTag
            hasBackground
            isRegular={!isPillBold}
            severity={bug.severity.name.toLowerCase() as Severities}
          />
        </AlignmentDiv>
      ),
      title: (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <BugTitle isUnread={!bug.read} isBold={isPillBold}>
            {bug.title.compact}
          </BugTitle>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
            <Pipe size="small" />
            <Tag isRegular={!isPillBold}>{bug.custom_status.name}</Tag>
            {!bug.read && (
              <Meta color={globalTheme.palette.blue[600]}>
                {t('__PAGE_BUGS_UNREAD_PILL')}
              </Meta>
            )}
          </div>
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
