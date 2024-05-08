import { MediaInput } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as SearchIcon } from 'src/assets/icons/search-stroke.svg';
import styled from 'styled-components';

export const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <MediaInput
        isCompact
        key="search-input"
        onChange={onChange}
        start={<SearchIcon />}
        value={value}
        placeholder={t('__VIDEO_PAGE_TRANSCRIPT_SEARCH_PLACEHOLDER')}
      />
    </div>
  );
};
