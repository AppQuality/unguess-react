import { getColor, Tag, Tooltip } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as InfoIcon } from '@zendeskgarden/svg-icons/src/12/info-stroke.svg';
import { useTranslation } from 'react-i18next';
import { getFiltersFromParams } from './getFiltersFromParams';

export const AppliedFilters = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const filterBy = useMemo(() => {
    const filtersFromParams = getFiltersFromParams(searchParams);
    // remove null and undefined values
    return Object.fromEntries(
      Object.entries(filtersFromParams).filter(([_, v]) => v)
    );
  }, [searchParams]);
  const filterLabels = {
    unique: t('__BUG_PAGE_HEADER_FILTER_UNIQUE'),
    unread: t('__BUG_PAGE_HEADER_FILTER_UNREAD'),
    severities: t('__BUG_PAGE_HEADER_FILTER_SEVERITIES'),
    devices: t('__BUG_PAGE_HEADER_FILTER_DEVICES'),
    os: t('__BUG_PAGE_HEADER_FILTER_OS'),
    priorities: t('__BUG_PAGE_HEADER_FILTER_PRIORITIES'),
    replicabilities: t('__BUG_PAGE_HEADER_FILTER_REPLICABILITIES'),
    status: t('__BUG_PAGE_HEADER_FILTER_STATUS'),
  };

  const renderFilterItems = () =>
    (Object.keys(filterLabels) as Array<keyof typeof filterLabels>).map(
      (key) => {
        if (key in filterBy && filterBy[key]) {
          return (
            <li key={key}>
              <strong>{filterLabels[key]}:</strong>{' '}
              {Array.isArray(filterBy[key]) &&
                filterBy[key].map((item: any) => item).join(', ')}
            </li>
          );
        }
        return null;
      }
    );
  return (
    <Tag color={getColor(appTheme.colors.infoHue, 600)} hue="transparent">
      {t('__BUG_PAGE_HEADER_FILTERS_APPLIED')}
      <Tag.SecondaryText color={appTheme.palette.grey[700]} isBold>
        {Object.keys(filterBy).length}{' '}
        {Object.keys(filterBy).length > 0 && (
          <Tooltip
            size="large"
            type="light"
            content={
              <ul
                style={{
                  listStyleType: 'disc',
                  paddingLeft: appTheme.space.sm,
                }}
              >
                {renderFilterItems()}
              </ul>
            }
          >
            <span>
              <InfoIcon />
            </span>
          </Tooltip>
        )}
      </Tag.SecondaryText>
    </Tag>
  );
};
