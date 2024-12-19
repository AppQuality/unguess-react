/* eslint-disable security/detect-object-injection */
import {
  getColor,
  IconButton,
  MD,
  Tooltip,
} from '@appquality/unguess-design-system';
import { ReactComponent as InfoIcon } from '@zendeskgarden/svg-icons/src/12/info-stroke.svg';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Meta } from 'src/common/components/Meta';
import styled, { useTheme } from 'styled-components';
import { getFiltersFromParams } from './getFiltersFromParams';

const Wrapper = styled.div`
  display: flex;
`;

export const AppliedFilters = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const filterBy = useMemo(() => {
    const filtersFromParams = getFiltersFromParams(searchParams);
    // remove null and undefined values
    return Object.fromEntries(
      Object.entries(filtersFromParams).filter(([, v]) => v)
    );
  }, [searchParams]);
  const filterLabels = {
    unique: t('__BUG_PAGE_HEADER_FILTER_UNIQUE'),
    unread: t('__BUG_PAGE_HEADER_FILTER_UNREAD'),
    severities: t('__BUG_PAGE_HEADER_FILTER_SEVERITIES'),
    devices: t('__BUG_PAGE_HEADER_FILTER_DEVICES'),
    os: t('__BUG_PAGE_HEADER_FILTER_OS'),
    priorities: t('__BUG_PAGE_HEADER_FILTER_PRIORITIES'),
    tags: t('__BUG_PAGE_HEADER_FILTER_TAGS'),
    types: t('__BUG_PAGE_HEADER_FILTER_TYPES'),
    replicabilities: t('__BUG_PAGE_HEADER_FILTER_REPLICABILITIES'),
    status: t('__BUG_PAGE_HEADER_FILTER_STATUS'),
    usecase: t('__BUG_PAGE_HEADER_FILTER_USECASE'),
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
            if (!Array.isArray(value) || !value) return '';

            if (key === 'usecase') return value.length.toString();

            return value.map((item: string) => item).join(', ');
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
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <MD isBold>{t('__BUG_PAGE_HEADER_FILTERS_APPLIED_HEADER')}:</MD>
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
