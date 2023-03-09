import { ReactChild } from 'react';
import { SM, Tag, Tooltip } from '@appquality/unguess-design-system';
import { TFunction } from 'react-i18next';
import { theme as globalTheme } from 'src/app/theme';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { Pipe } from 'src/common/components/Pipe';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { ReactComponent as FatherIcon } from 'src/assets/icons/bug-type-unique.svg';
import { PriorityIcon } from 'src/common/components/PriorityIcon';
import styled from 'styled-components';
import { BugTitle } from '../components/BugTitle';
import { TableBugType } from '../../../types';

const AlignmentDiv = ({
  alignment,
  children,
}: {
  alignment?: string;
  children: ReactChild | ReactChild[] | undefined;
}) => {
  const AlignedDiv = styled.div`
    height: 2em;
    display: flex;
    justify-content: ${alignment};
    align-items: center;
  `;
  return <AlignedDiv>{children}</AlignedDiv>;
};

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

    return {
      key: bug.id.toString(),
      id: bug.id.toString(),
      siblings: (
        <AlignmentDiv alignment="center">
          <CustomTag isPill={false} hue="rgba(0,0,0,0)" isRegular={!isPillBold}>
            <Tag.Avatar>{!bug.duplicated_of_id && <FatherIcon />}</Tag.Avatar>
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
            content={bug.priority?.name || 'medium'}
            placement="bottom"
            type="light"
          >
            <span style={{ height: '1em' }}>
              <PriorityIcon priority={bug.priority?.name} />
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
        <div>
          <AlignmentDiv alignment="start">
            <BugTitle isUnread={!bug.read} isBold={isPillBold}>
              {bug.title.compact}
            </BugTitle>
          </AlignmentDiv>
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
