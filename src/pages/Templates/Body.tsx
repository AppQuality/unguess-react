import {
  MD,
  MediaInput,
  Separator,
  Span,
  XXL,
} from '@appquality/unguess-design-system';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as SearchIcon } from 'src/assets/icons/search-stroke.svg';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import useDebounce from 'src/hooks/useDebounce';
import styled from 'styled-components';
import { useTemplatesContext } from './Context';
import { TemplateCardsGrid } from './TemplateCardsGrid';
import { SearchEmptyState } from './SearchEmptyState';

const StyledSection = styled.section`
  margin-bottom: ${(p) => p.theme.space.xxl};
  container-type: inline-size;
  container-name: cardsWrapper;
  ${XXL} {
    margin-bottom: ${(p) => p.theme.space.xs};
    color: ${(p) => p.theme.palette.blue[600]};
  }
  ${MD} {
    margin-bottom: ${(p) => p.theme.space.md};
    color: ${(p) => p.theme.palette.grey[700]};
  }
`;

const Body = () => {
  const { t } = useTranslation();
  const {
    templatesByCategory,
    promoTemplates,
    tailoredTemplates,
    searchQuery,
    setSearchQuery,
    searchResults,
  } = useTemplatesContext();
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: appTheme.space.xl,
      }}
    >
      <div style={{ maxWidth: '260px', alignSelf: 'flex-end' }}>
        <MediaInput
          start={<SearchIcon />}
          end={
            <CloseIcon
              onClick={() => setInputValue('')}
              style={{ cursor: 'pointer' }}
            />
          }
          type="search"
          data-qa="search-box"
          name={t('__TEMPLATES_PAGE_SEARCH_PLACEHOLDER')}
          placeholder={t('__TEMPLATES_PAGE_SEARCH_PLACEHOLDER')}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <AnimatePresence mode="wait">
        {searchQuery ? (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {searchResults.length === 0 ? (
              <SearchEmptyState />
            ) : (
              <StyledSection
                data-qa="filtered-templates"
                title={`Showing results for “${searchQuery}”`}
              >
                <XXL isBold>
                  <Trans
                    i18nKey="__TEMPLATES_PAGE_SEARCH_RESULTS_TITLE"
                    values={{ query: searchQuery, count: searchResults.length }}
                    count={searchResults.length}
                    defaultValue="Showing <span>2 results</span> for “<span>accessibility</span>”"
                    components={{
                      span: (
                        <Span style={{ color: appTheme.palette.blue[500] }} />
                      ),
                    }}
                  />
                </XXL>
                <TemplateCardsGrid
                  singleColumn
                  templates={searchResults}
                  highlight={searchQuery}
                />
              </StyledSection>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {tailoredTemplates.length > 0 && (
              <StyledSection
                id={t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}
                title={t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}
              >
                <XXL isBold>{t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}</XXL>
                <MD>{t('__TEMPLATES_PAGE_TAILORED_LIST_SUBTITLE')}</MD>
                <Separator />
                <TemplateCardsGrid templates={tailoredTemplates} />
              </StyledSection>
            )}
            {promoTemplates.length > 0 && (
              <StyledSection
                id={t('__TEMPLATES_PAGE_PROMO_LIST_TITLE')}
                title={t('__TEMPLATES_PAGE_PROMO_LIST_TITLE')}
              >
                <XXL isBold>{t('__TEMPLATES_PAGE_PROMO_LIST_TITLE')}</XXL>
                <MD>{t('__TEMPLATES_PAGE_UNGUESS_LIST_SUBTITLE')}</MD>
                <Separator />
                <TemplateCardsGrid templates={promoTemplates} />
              </StyledSection>
            )}
            {templatesByCategory.length > 0 && (
              <>
                {templatesByCategory.map((category) => {
                  const categoryId = category.id.toString();
                  return (
                    <StyledSection
                      key={categoryId}
                      id={categoryId}
                      data-qa={`category-section-${categoryId}`}
                      title={category.name || `Category ${categoryId}`}
                    >
                      <XXL>{category.name}</XXL>
                      <MD>{category.description}</MD>
                      <Separator />
                      <TemplateCardsGrid templates={category.templates} />
                    </StyledSection>
                  );
                })}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Body;
