import { useEffect, useState } from 'react';
import { MediaInput } from '@appquality/unguess-design-system';
import { ReactComponent as SearchIcon } from 'src/assets/icons/search-stroke.svg';
import { Field } from '@zendeskgarden/react-forms';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { searchFilterChanged } from 'src/features/campaignsFilter/campaignsFilterSlice';
import styled from 'styled-components';

export const SearchInput = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { search } = useAppSelector((state) => state.filters);

  const [value, setValue] = useState(search || '');

  const StyledField = styled(Field)`
    width: 100%;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      max-width: 260px;
    }
  `;

  useEffect(() => {
    setValue(search || '');
  }, [search]);

  const updateSearch = (text: string) => {
    setValue(text);
    dispatch(searchFilterChanged(text));
  };

  return (
    <StyledField>
      <MediaInput
        onChange={(e) => updateSearch(e.target.value)}
        start={<SearchIcon />}
        value={value}
        placeholder={t('__DASHBOARD_SEARCH_INPUT_PLACEHOLDER')}
      />
    </StyledField>
  );
};
