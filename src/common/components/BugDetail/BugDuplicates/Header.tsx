import { MD, Paragraph } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as SiblingIconSmall } from './icons/siblings-small.svg';

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

export const Header = () => {
  const { t } = useTranslation();
  return (
    <>
      <MD
        isBold
        style={{
          marginBottom: globalTheme.space.xxs,
          color: globalTheme.palette.grey[800],
        }}
      >
        <SiblingIconSmall
          style={{
            width: globalTheme.fontSizes.md,
            marginRight: globalTheme.space.xxs,
            color: globalTheme.palette.grey[600],
          }}
        />
        <Trans key="__BUGS_PAGE_BUG_DETAIL_SIBLINGS_DUPLICATES_TITLE">
          Duplicates (0)
        </Trans>
      </MD>
      <StyledParagraph style={{ marginBottom: globalTheme.space.md }}>
        {t('__BUGS_PAGE_BUG_DETAIL_SIBLINGS_DUPLICATES_SUBTITLE')}
      </StyledParagraph>
    </>
  );
};
