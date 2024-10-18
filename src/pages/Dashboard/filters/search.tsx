import {
  FormField as Field,
  MediaInput,
} from '@appquality/unguess-design-system';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { ReactComponent as SearchIcon } from 'src/assets/icons/search-stroke.svg';
import { searchFilterChanged } from 'src/features/campaignsFilter/campaignsFilterSlice';
import styled from 'styled-components';

const StyledField = styled(Field)`
  width: 100%;
  max-width: 100% !important;

  > * {
    width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 260px;
  }
`;

export const SearchInput = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { search } = useAppSelector((state) => state.filters);

  const [value, setValue] = useState(search || '');

  useEffect(() => {
    setValue(search || '');
  }, [search]);

  const updateSearch = (text: string) => {
    setValue(text);
    dispatch(searchFilterChanged(text));
  };

  interface SearchProps {
    searchValue: string;
  }

  const Search = useCallback(
    ({ searchValue }: SearchProps) => (
      <StyledField>
        <MediaInput
          key="search-input"
          onChange={(e) => updateSearch(e.target.value)}
          start={<SearchIcon />}
          value={searchValue}
          placeholder={t('__DASHBOARD_SEARCH_INPUT_PLACEHOLDER')}
        />
      </StyledField>
    ),
    []
  );

  return <Search searchValue={value} />;
};
