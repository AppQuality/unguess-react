import { Button, MD, Span, XL } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EmptyImage } from 'src/assets/empty-template-search.svg';
import { useTemplatesContext } from './Context';

const SearchEmptyState = () => {
  const { searchQuery, setSearchQuery } = useTemplatesContext();
  const resetSearch = () => {
    // Implement your reset search logic here
    setSearchQuery('');
  };
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <EmptyImage />
      <XL isBold style={{ marginBottom: appTheme.space.sm }}>
        <Trans
          i18nKey="__TEMPLATES_PAGE_SEARCH_EMPTY"
          values={{ searchQuery }}
          components={{
            span: <Span style={{ color: appTheme.palette.blue[500] }} />,
          }}
        />
      </XL>
      <MD style={{ marginBottom: appTheme.space.xl }}>
        {t('__TEMPLATES_PAGE_SEARCH_EMPTY_HINT')}
      </MD>
      <Button isPrimary isAccent size="large" onClick={resetSearch}>
        {t('__TEMPLATES_PAGE_SEARCH_EMPTY_BUTTON')}
      </Button>
    </div>
  );
};

export { SearchEmptyState };
