import { theme as globalTheme } from 'src/app/theme';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import { MD, Paragraph } from '@appquality/unguess-design-system';
import { useSiblings } from './useSiblings';
import { ReactComponent as SiblingIconSmall } from './icons/siblings-small.svg';
import { BugItem } from './BugItem';

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

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
  if (isLoading || isFetching || isError || !data || !data.siblings.length)
    return null;

  return (
    <>
      <MD
        isBold
        style={{
          color: globalTheme.palette.grey[800],
          marginBottom: globalTheme.space.xxs,
        }}
      >
        <SiblingIconSmall
          style={{
            width: globalTheme.fontSizes.md,
            marginRight: globalTheme.space.xxs,
            color: globalTheme.palette.grey[600],
          }}
        />
        <Trans i18nKey="__BUGS_PAGE_BUG_DETAIL_SIBLINGS_DUPLICATES_TITLE">
          Duplicates ({{ number: data.siblings.length }})
        </Trans>
      </MD>
      <StyledParagraph style={{ marginBottom: globalTheme.space.md }}>
        {t('__BUGS_PAGE_BUG_DETAIL_SIBLINGS_DUPLICATES_SUBTITLE')}
      </StyledParagraph>
      {data.siblings
        .slice(0, isOpen ? data.siblings.length : maxSiblingSize)
        .map((item) => (
          <BugItem
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
