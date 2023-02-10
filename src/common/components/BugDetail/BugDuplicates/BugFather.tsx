import { theme as globalTheme } from 'src/app/theme';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { MD, Paragraph } from '@appquality/unguess-design-system';
import { useSiblings } from './useSiblings';
import { ReactComponent as FatherIconSmall } from './icons/father-small.svg';
import { BugItem } from './BugItem';

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

export const BugFather = ({ cid, bugId }: { cid: number; bugId: number }) => {
  const { t } = useTranslation();
  const { data, isLoading, isFetching, isError } = useSiblings({ cid, bugId });
  if (isLoading || isFetching || isError || !data || !data.father) return null;
  return (
    <>
      <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
        <FatherIconSmall
          style={{
            width: globalTheme.fontSizes.sm,
            marginRight: globalTheme.space.xxs,
            color: globalTheme.palette.grey[600],
          }}
        />
        {t('__BUGS_PAGE_BUG_DETAIL_SIBLINGS_FATHER_TITLE')}
      </MD>
      <StyledParagraph style={{ marginBottom: globalTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_SIBLINGS_FATHER_SUBTITLE')}
      </StyledParagraph>
      <BugItem
        isFather
        campaignId={cid}
        bugId={data.father.id}
        title={data.father.title.compact}
        pills={[
          ...(data.father.title.context ? data.father.title.context : []),
          data.father.device,
          `${data.father.os.name} ${data.father.os.version}`,
        ]}
      />
    </>
  );
};
