import { Tooltip } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { getFiltersFromParams } from './getFiltersFromParams';

export const AppliedFilters = () => {
  const [searchParams] = useSearchParams();
  const filterBy = useMemo(() => {
    const filtersFromParams = getFiltersFromParams(searchParams);
    // remove null and undefined values
    return Object.fromEntries(
      Object.entries(filtersFromParams).filter(([_, v]) => v)
    );
  }, [searchParams]);
  const filterLabels = {
    unique: 'Unique only',
    unread: 'Unread only',
    severities: 'Severities',
    devices: 'Devices',
    os: 'OS',
    priorities: 'Priorities',
    replicabilities: 'Replicabilities',
    status: 'Status',
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
    <div>
      applied filters: {Object.keys(filterBy).length}{' '}
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
          <span>(i)</span>
        </Tooltip>
      )}
    </div>
  );
};
