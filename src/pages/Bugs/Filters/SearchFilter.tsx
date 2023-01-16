import styled from 'styled-components';
import { MediaInput } from '@appquality/unguess-design-system';
import { ReactComponent as SearchIcon } from 'src/assets/icons/search-stroke.svg';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as XIcon } from 'src/assets/icons/close-icon.svg';

const ClickableXIcon = styled(XIcon)`
  cursor: pointer;
`;

export const SearchFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { t } = useTranslation();

  if (!data) return null;

  return (
    <div style={{ maxWidth: '180px' }}>
      <MediaInput
        end={
          data.search ? (
            <ClickableXIcon
              onClick={() => {
                dispatch(
                  updateFilters({
                    filters: {
                      search: undefined,
                    },
                  })
                );
              }}
            />
          ) : undefined
        }
        key="search-input"
        onChange={(e) =>
          dispatch(
            updateFilters({
              filters: {
                search: e.target.value !== '' ? e.target.value : undefined,
              },
            })
          )
        }
        start={<SearchIcon />}
        value={data.search || ''}
        placeholder={t('__BUGS_SEARCH_INPUT_PLACEHOLDER')}
      />
    </div>
  );
};
