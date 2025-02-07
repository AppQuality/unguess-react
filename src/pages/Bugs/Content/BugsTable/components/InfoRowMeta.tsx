import { Span, Tag } from '@appquality/unguess-design-system';
import { ReactComponent as BugsIcon } from 'src/assets/icons/bugs-icon.svg';
import { appTheme } from 'src/app/theme';
import { t } from 'i18next';
import { TableBugType } from '../../../types';

export const InfoRowMeta = ({ bugs }: { bugs: TableBugType[] }) => {
  // Count bugs with read = false
  const totalBugs = bugs.length ?? 0;
  const unreadBugs = bugs.filter((bug) => bug.read === false) ?? [];

  return (
    <>
      <Tag isPill hue={appTheme.palette.blue[100]} size="large">
        <Tag.Avatar>
          <BugsIcon color={appTheme.palette.grey[600]} />
        </Tag.Avatar>
        <Tag.SecondaryText>
          {t('__BUGS_PAGE_TABLE_HEADER_META_UNREAD_BUGS_LABEL', {
            unreadBugs: unreadBugs.length,
          })}
        </Tag.SecondaryText>
      </Tag>
      <Span style={{ fontWeight: appTheme.fontWeights.semibold }}>
        {t('__BUGS_PAGE_TABLE_HEADER_META_TOTAL_BUGS_LABEL', {
          uniqueBugs: totalBugs,
        })}
      </Span>
    </>
  );
};
