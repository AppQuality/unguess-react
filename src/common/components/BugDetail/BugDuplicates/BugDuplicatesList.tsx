import { appTheme } from 'src/app/theme';
import { Trans, useTranslation } from 'react-i18next';
import { MD, Paragraph } from '@appquality/unguess-design-system';
import { useSiblings } from './useSiblings';
import { ReactComponent as SiblingIconSmall } from './icons/siblings-small.svg';
import { BugItem } from './BugItem';

export const BugDuplicatesList = ({
  cid,
  bugId,
  isOpen,
  maxSiblingSize,
}: {
  cid: number;
  bugId: number;
  isOpen: boolean;
  maxSiblingSize?: number;
}) => {
  const { t } = useTranslation();
  const { data, isLoading, isFetching, isError } = useSiblings({ cid, bugId });
  if (isLoading || isFetching || isError) return null;

  return (
    <>
      <MD
        isBold
        style={{
          marginBottom: appTheme.space.xxs,
        }}
      >
        <SiblingIconSmall
          style={{
            width: appTheme.fontSizes.md,
            marginRight: appTheme.space.xxs,
            color: appTheme.palette.grey[600],
          }}
        />
        <Trans i18nKey="__BUGS_PAGE_BUG_DETAIL_SIBLINGS_DUPLICATES_TITLE">
          Duplicates ({{ number: data?.siblings.length || 0 }})
        </Trans>
      </MD>
      <Paragraph
        color={appTheme.palette.grey[600]}
        style={{ marginBottom: appTheme.space.md }}
      >
        {t('__BUGS_PAGE_BUG_DETAIL_SIBLINGS_DUPLICATES_SUBTITLE')}
      </Paragraph>
      {data?.siblings
        .slice(0, isOpen ? data.siblings.length : maxSiblingSize)
        .map((item) => (
          <BugItem
            className="bug-overview-duplicated-bug"
            key={item.id}
            campaignId={cid}
            bugId={item.id}
            title={item.title.compact}
            pills={[
              ...(item.title.context ? item.title.context : []),
              item.device,
              `${item.os.name} ${item.os.version}`,
            ]}
          />
        ))}
    </>
  );
};
