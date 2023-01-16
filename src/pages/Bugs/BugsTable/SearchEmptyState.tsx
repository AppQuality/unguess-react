import { Button, LG, MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { theme } from 'src/app/theme';
import { resetFilters } from 'src/features/bugsPage/bugsPageSlice';

export const SearchEmptyState = ({ searchTerm }: { searchTerm?: string }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <>
      <LG
        isBold
        style={{ color: theme.palette.blue[600], marginBottom: theme.space.xs }}
      >
        {searchTerm
          ? `${t(
              '__PAGE_BUG_SEARCH_EMPTY_STATE_MAIN_SEARCHTERM',
              "we couldn't find anything for"
            )} "${searchTerm}"`
          : t(
              '__PAGE_BUG_SEARCH_EMPTY_STATE_MAIN_GENERIC',
              "we couldn't find anything with the selected criteria"
            )}
      </LG>
      <MD
        style={{ color: theme.palette.grey[500], marginBottom: theme.space.md }}
      >
        {t(
          '__PAGE_BUG_SEARCH_EMPTY_STATE_SUB',
          'Try looking for something different'
        )}
      </MD>
      <Button
        isPrimary
        isPill
        themeColor={theme.palette.water[600]}
        type="reset"
        onClick={() => {
          dispatch(resetFilters());
        }}
      >
        {t('__PAGE_BUG_EMPTY_STATE_CTA', 'Reset')}
      </Button>
    </>
  );
};
