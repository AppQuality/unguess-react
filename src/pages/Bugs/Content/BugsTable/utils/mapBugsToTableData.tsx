import { TFunction } from 'react-i18next';
import { SM } from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';
import { Pill } from 'src/common/components/pills/Pill';
import { SeverityPill } from 'src/common/components/pills/SeverityPill';
import { Pipe } from 'src/common/components/Pipe';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { ReactComponent as FatherIcon } from 'src/assets/icons/father-icon.svg';
import { BugTitle } from '../components/BugTitle';
import { TableBugType } from '../../../types';

const DuplicateContainer = styled((props) => <SM isBold {...props} />)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xxs};
  line-height: ${({ theme }) => theme.lineHeights.md};
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
        <DuplicateContainer>
          {!bug.duplicated_of_id ? (
            <FatherIcon style={{ color: globalTheme.palette.grey[500] }} />
          ) : null}
          {bug.siblings > 0 ? <>+{bug.siblings}</> : null}
        </DuplicateContainer>
      ),
      bugId: (
        <span style={{ color: globalTheme.palette.grey[700] }}>
          {bug.id.toString()}
        </span>
      ),
      severity: (
        <SeverityPill
          severity={bug.severity.name.toLowerCase() as Severities}
        />
      ),
      title: (
        <div>
          <BugTitle isUnread={!bug.read} isBold={isPillBold}>
            {bug.title.compact}
          </BugTitle>
          {bug.title.context && (
            <Pill isBold={isPillBold}>{bug.title.context}</Pill>
          )}
          {bug.type.name && (
            <>
              <Pipe size="small" />
              <Pill
                isBold={isPillBold}
                style={{ marginLeft: globalTheme.space.xs }}
              >
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
                color={globalTheme.palette.blue[600]}
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
        globalTheme.colors.bySeverity[
          bug.severity.name.toLowerCase() as Severities
        ],
    };
  });
};
