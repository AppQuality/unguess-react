import {
  Autocomplete,
  DropdownFieldNew as Field,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { ComponentProps, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import analytics from 'src/analytics';
import { ReactComponent as CopyIcon } from 'src/assets/icons/copy-icon.svg';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  usePostCampaignsByCidVideoTagsMutation,
} from 'src/features/api';

export interface ObservationFormValues {
  title: number;
  severity: number;
  notes: string;
  quotes?: string;
}

export const TitleDropdown = ({
  titles,
  formProps,
}: {
  titles?: GetCampaignsByCidVideoTagsApiResponse[number]['tags'];
  formProps: FormikProps<ObservationFormValues>;
}) => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const [addVideoTags] = usePostCampaignsByCidVideoTagsMutation();
  const titleMaxLength = 70;
  const options: ComponentProps<typeof Autocomplete>['options'] = useMemo(
    () =>
      (titles || []).map((i) => ({
        id: i.id.toString(),
        value: i.id.toString(),
        children: `${i.name} (${i.usageNumber})`,
        label: i.name,
        isSelected: formProps.values.title === i.id,
        itemID: i.id.toString(),
        onOptionActionClick: () => {
          analytics.track('tagEditModalOpened', {
            tagId: i.id.toString(),
            tagType: 'theme',
            tagName: i.name,
            associatedObservations: i.usageNumber,
          });
        },
      })),
    [titles, formProps.values.title]
  );

  if (!titles) {
    return null;
  }

  return (
    <Field>
      <Autocomplete
        options={options}
        data-qa="video-title-dropdown"
        isEditable
        isCreatable
        listboxAppendToNode={document.body}
        renderValue={({ selection }) => {
          if (!selection) return '';
          // @ts-ignore
          const title = titles.find((i) => i.id === Number(selection.value));
          return title?.name || '';
        }}
        onClick={() =>
          analytics.track('tagDropdownOpened', {
            dropdownType: 'theme',
            availableTagsCount: options.length,
          })
        }
        selectionValue={formProps.values.title.toString()}
        onCreateNewOption={async (value) => {
          if (value.length > titleMaxLength) {
            formProps.setErrors({
              title: t(
                '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_MAX_ERROR'
              ),
            });
            return false;
          }

          const res = await addVideoTags({
            cid: campaignId?.toString() || '0',
            body: {
              group: {
                name: 'title',
              },
              tag: {
                name: value,
              },
            },
          }).unwrap();
          formProps.setFieldValue('title', Number(res.tag.id));

          return {
            id: res.tag.id.toString(),
            value: res.tag.id.toString(),
            label: res.tag.name,
          };
        }}
        onOptionClick={({ inputValue, selectionValue }) => {
          if (!selectionValue || !inputValue) return;
          formProps.setFieldValue('title', Number(selectionValue));
        }}
        startIcon={<CopyIcon />}
        placeholder={t(
          '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_PLACEHOLDER'
        )}
      />
    </Field>
  );
};
