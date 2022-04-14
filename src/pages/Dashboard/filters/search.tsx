import {
  MediaInput,
} from "@appquality/unguess-design-system";

import { ReactComponent as SearchIcon } from "src/assets/icons/search-stroke.svg";
import { Field } from "@zendeskgarden/react-forms";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "src/app/hooks";
import {
  searchFilterChanged,
} from "src/features/campaignsFilter/campaignsFilterSlice";

export const SearchInput = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

 
  return (
    <Field style={{maxWidth: "260px"}}>
      <MediaInput onChange={(e) => dispatch(searchFilterChanged(e.target.value))} start={<SearchIcon />} placeholder={t("__DASHBOARD_SEARCH_INPUT_PLACEHOLDER")} />
    </Field>
  );
};
