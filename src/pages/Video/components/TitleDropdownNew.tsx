import {
  Autocomplete,
  DropdownFieldNew as Field,
  Button,
  MD,
  TooltipModal,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CopyIcon } from 'src/assets/icons/copy-icon.svg';
import { ReactComponent as EditIcon } from 'src/assets/icons/edit-icon.svg';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  usePostCampaignsByCidVideoTagsMutation,
} from 'src/features/api';
import { useTooltipModalContext } from './context';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const { campaignId } = useParams();
  const [addVideoTags] = usePostCampaignsByCidVideoTagsMutation();
  const titleMaxLength = 70;

  if (!titles) {
    return null;
  }

  const Edit = () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const { setModalRef } = useTooltipModalContext();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // avoid select options to be closed when clicking on the edit icon
      e.stopPropagation();
      e.preventDefault();

      e.nativeEvent.stopImmediatePropagation();
      setModalRef(triggerRef.current);
    };
    return (
      <>
        <Button ref={triggerRef} onClick={handleClick}>
          <EditIcon />
        </Button>
      </>
    );
  };

  const EditModal = () => {
    const { modalRef, setModalRef } = useTooltipModalContext();
    return (
      <TooltipModal
        focusOnMount={false}
        onBlur={() => {
          setIsExpanded(false);
        }}
        referenceElement={modalRef}
        appendToNode={document.querySelector('main') || undefined}
        onClose={() => setModalRef(null)}
        placement="auto"
        hasArrow={false}
        role="dialog"
        style={{ zIndex: 900000000000000 }}
      >
        <TooltipModal.Title>
          <MD isBold style={{ marginBottom: appTheme.space.sm }}>
            titolo
          </MD>
        </TooltipModal.Title>

        <TooltipModal.Body>
          <label htmlFor="title-input">Title</label>
          <input type="text" id="title-input" />
        </TooltipModal.Body>
      </TooltipModal>
    );
  };

  return (
    <Field>
      <EditModal />
      <Autocomplete
        onClick={() => setIsExpanded(true)}
        isExpanded={isExpanded}
        listboxAppendToNode={document.querySelector('main') || undefined}
        isCreatable
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
          icon: <Edit />,
        }))}
        startIcon={<CopyIcon />}
        placeholder={t(
          '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_PLACEHOLDER'
        )}
      />
    </Field>
  );
};
