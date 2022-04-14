import { useEffect, useState } from "react";
import { MediaInput } from "@appquality/unguess-design-system";
import { ReactComponent as SearchIcon } from "src/assets/icons/search-stroke.svg";
import { Field } from "@zendeskgarden/react-forms";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { searchFilterChanged } from "src/features/campaignsFilter/campaignsFilterSlice";

export const SearchInput = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { search } = useAppSelector((state) => state.filters);

  const [value, setValue] = useState(search || "");

  useEffect(() => {
    setValue(search || "");
  }, [search]);

  const updateSearch = (text: string) => {
    setValue(text);
    dispatch(searchFilterChanged(text));
  };

  return (
    <Field style={{ maxWidth: "260px" }}>
      <MediaInput
        onChange={(e) => updateSearch(e.target.value)}
        start={<SearchIcon />}
        value={value}
        placeholder={t("__DASHBOARD_SEARCH_INPUT_PLACEHOLDER")}
      />
    </Field>
  );
};
