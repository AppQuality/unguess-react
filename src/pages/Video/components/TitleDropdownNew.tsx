import {
  Autocomplete,
  DropdownFieldNew as Field,
  Option,
  MediaBody,
  MediaFigure,
  Separator,
  Span,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CopyIcon } from 'src/assets/icons/copy-icon.svg';
import { ReactComponent as AddIcon } from 'src/assets/icons/grid-add.svg';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  usePostCampaignsByCidVideoTagsMutation,
} from 'src/features/api';
import useDebounce from 'src/hooks/useDebounce';

export interface ObservationFormValues {
  title: number;
  severity: number;
  notes: string;
  quotes?: string;
}

export const TitleDropdownNew = ({
  titles,
  title,
  formProps,
}: {
  titles?: GetCampaignsByCidVideoTagsApiResponse[number]['tags'];
  title?: GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number];
  formProps: FormikProps<ObservationFormValues>;
}) => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const [selectedItem, setSelectedItem] =
    useState<GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number]>();
  const [newItemName, setNewItemName] = useState('');
  const [matchingOptions, setMatchingOptions] = useState(titles);
  const [addVideoTags] = usePostCampaignsByCidVideoTagsMutation();
  const titleMaxLength = 70;

  const filterMatchingOptions = (value: string) => {
    const matchedOptions = titles?.filter(
      (i) =>
        i.name.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
    );

    setMatchingOptions(matchedOptions);
  };

  useEffect(() => {
    if (title) {
      setSelectedItem(title);
    }
  }, [title]);

  return (
    <Field>
      <Autocomplete
        isCreatable
        options={[]}
        defaultValue={selectedItem?.name}
        startIcon={<CopyIcon />}
        placeholder={t(
          '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_PLACEHOLDER'
        )}
      />
    </Field>
  );
};
