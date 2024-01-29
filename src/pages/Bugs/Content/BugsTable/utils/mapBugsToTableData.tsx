import { SM, Span, Tag, Tooltip } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as FatherIcon } from 'src/assets/icons/bug-type-unique.svg';
import { Meta } from 'src/common/components/Meta';
import { Pipe } from 'src/common/components/Pipe';
import { TextAlign } from 'src/common/components/Table';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { getCustomStatusInfo } from 'src/common/components/utils/getCustomStatusInfo';
import { getPriorityInfo } from 'src/common/components/utils/getPriorityInfo';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { Circle } from 'src/common/components/CustomStatusDrawer/Circle';
import styled from 'styled-components';
import { ReactComponent as CommentsIcon } from 'src/assets/icons/speech-bubble-plain-stroke.svg';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { TableBugType } from '../../../types';
import { BugTitle } from '../components/BugTitle';

const AlignmentDiv = styled.div<{
  alignment?: TextAlign;
}>`
  height: 2em;
  display: flex;
  justify-content: ${(props: { alignment?: TextAlign }) =>
    props.alignment || 'center'};
  align-items: center;
  cursor: pointer;
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

const CommentsCountBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${({ theme }) => theme.space.xxs};
  color: ${({ theme }) => theme.palette.grey[700]};
`;

export const mapBugsToTableData = (bugs: TableBugType[]) => {
  const currentBugId = getSelectedBugId();
  const { t } = useTranslation();

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
              <AlignmentDiv alignment="start">
                <Tooltip
                  content={t('__BUGS_TABLE_DUPLICATE_TOOLTIP_TEXT')}
                  placement="bottom"
                  type="light"
                  size="medium"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <FatherIcon />
                </Tooltip>
              </AlignmentDiv>
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
            <Tag isRegular={!isPillBold} hue="rgba(0,0,0,0)">
              <Circle color={`#${bug.custom_status.color}`} />
              <Span
                style={{ textTransform: 'capitalize', fontWeight: 'normal' }}
              >
                {
                  getCustomStatusInfo(bug.custom_status.name as BugState, t)
                    .text
                }
              </Span>
            </Tag>
            {!bug.read && (
              <Meta color={appTheme.palette.blue[600]}>
                {t('__PAGE_BUGS_UNREAD_PILL')}
              </Meta>
            )}
            <Pipe size="small" />
            <CommentsCountBadge>
              <CommentsIcon style={{ marginRight: appTheme.space.xxs }} />
              <SM>
                {t('__PAGE_BUGS_COMMENTS_NUMBER_LABEL')}:
                <Span isBold style={{ marginLeft: appTheme.space.xxs }}>
                  {bug.comments}
                </Span>
              </SM>
            </CommentsCountBadge>
          </div>
        </div>
      ),
      isHighlighted: !bug.read,
      created: bug.created,
      updated: bug.updated,
      borderColor:
        appTheme.colors.bySeverity[
          bug.severity.name.toLowerCase() as Severities
        ],
    };
  });
};
