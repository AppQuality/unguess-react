import { Button, LG, MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { resetFilters } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { ReactComponent as EmptyStateImg } from '../assets/bugs_empty_state.svg';

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-top: ${appTheme.space.md};
`;

export const EmptyState = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <StyledEmptyState>
      <EmptyStateImg
        title="Table is empty"
        style={{ marginBottom: appTheme.space.lg }}
      />
      <LG
        isBold
        style={{
          color: appTheme.palette.blue[600],
          marginBottom: appTheme.space.xs,
        }}
      >
        {t(
          '__PAGE_BUG_SEARCH_EMPTY_STATE_MAIN_GENERIC',
          "we couldn't find anything with the selected criteria"
        )}
      </LG>
      <MD
        style={{
          color: appTheme.palette.grey[500],
          marginBottom: appTheme.space.md,
        }}
      >
        {t(
          '__PAGE_BUG_SEARCH_EMPTY_STATE_SUB',
          'Try looking for something different'
        )}
      </MD>
      <Button
        isPrimary
        isAccent
        type="reset"
        onClick={() => {
          dispatch(resetFilters());
        }}
      >
        {t('__PAGE_BUG_EMPTY_STATE_CTA', 'Reset')}
      </Button>
    </StyledEmptyState>
  );
};
