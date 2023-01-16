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
import useDebounce from 'src/hooks/useDebounce';
import { useEffect, useState } from 'react';

const ClickableXIcon = styled(XIcon)`
  cursor: pointer;
`;

export const SearchFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const [searchInput, setSearchInput] = useState<string>('');
  const { t } = useTranslation();

  const searchValue = useDebounce<string>(searchInput || '', 300);

  useEffect(() => {
    dispatch(
      updateFilters({
        filters: {
          search: searchValue,
        },
      })
    );
  }, [searchValue]);

  if (!data) return null;

  return (
    <div style={{ maxWidth: '180px' }}>
      <MediaInput
        end={
          data.search ? (
            <ClickableXIcon onClick={() => setSearchInput('')} />
          ) : undefined
        }
        key="search-input"
        onChange={(e) => setSearchInput(e.target.value)}
        start={<SearchIcon />}
        value={searchInput}
        placeholder={t('__BUGS_SEARCH_INPUT_PLACEHOLDER')}
      />
    </div>
  );
};
