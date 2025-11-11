import {
  Autocomplete,
  DropdownFieldNew as Field,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ReactComponent as CopyIcon } from 'src/assets/icons/copy-icon.svg';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  usePostCampaignsByCidVideoTagsMutation,
} from 'src/features/api';
import { EditTagModal } from './EditTagModal';

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

  if (!titles) {
    return null;
  }

  return (
    <Field>
      <Autocomplete
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
        options={(titles || []).map((i) => ({
          id: i.id.toString(),
          value: i.id.toString(),
          label: `${i.name} (${i.usageNumber})`,
          isSelected: formProps.values.title === i.id,
          actions: ({ closeModal }) => (
            <EditTagModal
              tag={i}
              closeModal={closeModal}
              title={t('__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_TITLE')}
              label={t('__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_LABEL')}
              description={t(
                '__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_DESCRIPTION',
                {
                  usageNumber: i.usageNumber,
                  count: Number(i.usageNumber),
                }
              )}
            />
          ),
          itemID: i.id.toString(),
        }))}
        startIcon={<CopyIcon />}
        placeholder={t(
          '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_PLACEHOLDER'
        )}
      />
    </Field>
  );
};
