import {
  Autocomplete,
  DropdownFieldNew as Field,
  Input,
  Label,
  MD,
  Paragraph,
  SM,
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
import styled from 'styled-components';
import { useTooltipModalContext } from './context';
import { Button } from '@appquality/unguess-design-system';

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

  const EditAction = styled.div`
    cursor: pointer;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${appTheme.palette.grey[200]};
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${appTheme.palette.grey[400]};
    }
  `;

  const Edit = ({ optionId }: { optionId: string }) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const { setModalRef } = useTooltipModalContext();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // avoid select options to be closed when clicking on the edit icon
      e.stopPropagation();
      e.preventDefault();

      e.nativeEvent.stopImmediatePropagation();
      const el = document.querySelector(`[itemid="${optionId}"]`);

      if (el) {
        el.setAttribute('hover', 'true');
        el.parentElement?.style.setProperty('pointer-events', 'none');
      }
      setModalRef(triggerRef.current);
    };
    return (
      <EditAction ref={triggerRef} onClick={handleClick}>
        <EditIcon />
      </EditAction>
    );
  };

  const editModal = ({ closeModal }: { closeModal: () => void }) => {
    return (
      <>
        <TooltipModal.Title>
          <MD isBold style={{ marginBottom: appTheme.space.sm }}>
            titolo della modale di modifica
          </MD>
        </TooltipModal.Title>

        <TooltipModal.Body>
          <Label htmlFor="title-input">Modifica Tema/Tag</Label>
          <Input id="title-input" />
          <Paragraph style={{ margin: `${appTheme.space.md} 0` }}>
            <SM>
              Descrizione della modale di modifica del Tema/Tag o altro testo
            </SM>
          </Paragraph>
          <Button size="small" isDanger onClick={closeModal}>
            Elimina Tag
          </Button>
        </TooltipModal.Body>
      </>
    );
  };

  return (
    <Field>
      <Autocomplete
        onClick={() => setIsExpanded(true)}
        isExpanded={isExpanded}
        isDisabled={isExpanded}
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
        options={(titles || []).map((i) => {
          return {
            id: i.id.toString(),
            value: i.id.toString(),
            label: `${i.name} (${i.usageNumber})`,
            isSelected: formProps.values.title === i.id,
            actions: editModal,
            itemID: i.id.toString(),
          };
        })}
        startIcon={<CopyIcon />}
        placeholder={t(
          '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_PLACEHOLDER'
        )}
      />
    </Field>
  );
};
