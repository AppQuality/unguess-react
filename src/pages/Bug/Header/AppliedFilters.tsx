/* eslint-disable security/detect-object-injection */
import {
  getColor,
  IconButton,
  MD,
  Tooltip,
} from '@appquality/unguess-design-system';
import { ReactComponent as InfoIcon } from '@zendeskgarden/svg-icons/src/12/info-stroke.svg';
import { useTranslation } from 'react-i18next';
import { getSelectedFilters } from 'src/features/bugsPage/bugsPageSlice';
import { appTheme } from 'src/app/theme';
import { Meta } from 'src/common/components/Meta';
import styled, { useTheme } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

export const AppliedFilters = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const filterBy = getSelectedFilters();
  // remove empty filters
  (Object.keys(filterBy) as Array<keyof typeof filterBy>).forEach((key) => {
    // remove empty values
    if (
      filterBy[key] === 'all' ||
      filterBy[key] === undefined ||
      (Array.isArray(filterBy[key]) &&
        filterBy[key] !== undefined &&
        (filterBy[key] as any[]).length === 0)
    ) {
      delete filterBy[key];
    }
  });
  const filterLabels = {
    unique: t('__BUG_PAGE_HEADER_FILTER_UNIQUE'),
    read: t('__BUG_PAGE_HEADER_FILTER_UNREAD'),
    severities: t('__BUG_PAGE_HEADER_FILTER_SEVERITIES'),
    devices: t('__BUG_PAGE_HEADER_FILTER_DEVICES'),
    os: t('__BUG_PAGE_HEADER_FILTER_OS'),
    priorities: t('__BUG_PAGE_HEADER_FILTER_PRIORITIES'),
    tags: t('__BUG_PAGE_HEADER_FILTER_TAGS'),
    types: t('__BUG_PAGE_HEADER_FILTER_TYPES'),
    replicabilities: t('__BUG_PAGE_HEADER_FILTER_REPLICABILITIES'),
    customStatuses: t('__BUG_PAGE_HEADER_FILTER_STATUS'),
    useCases: t('__BUG_PAGE_HEADER_FILTER_USECASE'),
    search: t('__BUG_PAGE_HEADER_FILTER_SEARCH'),
  };

  const renderFilterItems = () =>
    (Object.keys(filterLabels) as Array<keyof typeof filterLabels>).map(
      (key) => {
        if (
          filterBy &&
          typeof filterBy === 'object' &&
          key in filterBy &&
          filterBy[key]
        ) {
          const name = filterLabels[key];

          const getValue = () => {
            const value = filterBy[key];
            if (!value) return '';
            if (typeof value === 'string') return value;
            return value
              .map((item) => {
                if (typeof item === 'string') return item;
                if ('name' in item) return item.name;
                if ('display_name' in item) return item.display_name;
                if ('device' in item) return item.device;
                if ('os' in item) return item.os;
                if ('title' in item) return item.title.full;
                return '';
              })
              .join(', ');
          };

          const value = getValue();

          return (
            <li key={key}>
              <strong>
                {name}
                {value.length > 0 ? ':' : ''}
              </strong>{' '}
              {value}
            </li>
          );
        }
        return null;
      }
    );
  return (
    <Wrapper>
      <Meta
        size="large"
        color={getColor(theme.colors.infoHue, 600)}
        secondaryText={Object.keys(filterBy).length}
      >
        {t('__BUG_PAGE_HEADER_FILTERS_APPLIED')}
      </Meta>
      {Object.keys(filterBy).length > 0 && (
        <Tooltip
          size="large"
          type="light"
          content={
            <div>
              <MD style={{ marginBottom: appTheme.space.xs }} isBold>
                {t('__BUG_PAGE_HEADER_FILTERS_APPLIED_HEADER')}:
              </MD>
              <ul
                style={{
                  listStyleType: 'disc',
                  paddingLeft: appTheme.space.sm,
                }}
              >
                {renderFilterItems()}
              </ul>
            </div>
          }
        >
          <IconButton size="small">
            <InfoIcon />
          </IconButton>
        </Tooltip>
      )}
    </Wrapper>
  );
};
