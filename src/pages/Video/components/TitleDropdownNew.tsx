import {
  Autocomplete,
  DropdownFieldNew as Field,
} from '@appquality/unguess-design-system';
import { ReactComponent as EditIcon } from '@zendeskgarden/svg-icons/src/12/pencil-stroke.svg';
import { FormikProps } from 'formik';
import { ComponentProps, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ReactComponent as CopyIcon } from 'src/assets/icons/copy-icon.svg';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  usePostCampaignsByCidVideoTagsMutation,
} from 'src/features/api';
import { useAnalytics } from 'use-analytics';
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
  const { track } = useAnalytics();
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
        actions: ({ closeModal }) => (
          <EditTagModal
            type="theme"
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
        actionIcon: <EditIcon />,
        itemID: i.id.toString(),
        onOptionActionClick: () => {
          track('tagEditModalOpened', {
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
          track('tagDropdownOpened', {
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
