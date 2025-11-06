import {
  Autocomplete,
  Button,
  DropdownFieldNew as Field,
  Input,
  Label,
  MD,
  Message,
  Notification,
  Paragraph,
  SM,
  TooltipModal,
  useToast,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { ErrorMessage } from 'formik/dist/ErrorMessage';
import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CopyIcon } from 'src/assets/icons/copy-icon.svg';
import { ReactComponent as SaveIcon } from 'src/assets/icons/save.svg';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  usePatchCampaignsByCidVideoTagsAndTagIdMutation,
  usePostCampaignsByCidVideoTagsMutation,
} from 'src/features/api';

export interface ObservationFormValues {
  title: number;
  severity: number;
  notes: string;
  quotes?: string;
}

interface EditModalProps {
  option: { value: string | object; label: string };
  closeModal: () => void;
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

  const editModal = ({ option, closeModal }: EditModalProps) => {
    // Extract both the current title and the usage number in parentheses in two variables
    const currentTitle = option.label.replace(/\s*\(\d+\)/, '');
    const usageNumber = option.label.match(/\((\d+)\)/)?.[1];
    const [newTitle, setNewTitle] = useState(currentTitle);
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [patchVideoTag] = usePatchCampaignsByCidVideoTagsAndTagIdMutation({});
    const { addToast } = useToast();

    useEffect(() => {
      if (newTitle.trim() === '') {
        setError(
          t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_REQUIRED_ERROR')
        );
      } else {
        setError(null);
      }
    }, [newTitle]);

    const handleSubmit = async () => {
      console.log('titledrop', error);
      if (error) return;
      // Update the title in the form
      console.log('titledrop no error', newTitle);
      try {
        await patchVideoTag({
          cid: campaignId?.toString() || '0',
          tagId: option.value.toString(),
          body: {
            newTagName: newTitle,
          },
        }).unwrap();
        closeModal();
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t(
                '__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_SUCCESS_TOAST_MESSAGE'
              )}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      } catch (error: any) {
        // Handle error (e.g., show error toast)
        // if status code is 409, conflict with another already saved name, show specific error
        console.log('titledrop catch', error);
        if (error.status === 409) {
          console.log('titledrop 409', error);
          setError(
            t(
              '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_DUPLICATE_ERROR'
            )
          );
        } else {
          console.log('titledrop else', error);
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="error"
                message={t(
                  '__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_ERROR_TOAST_MESSAGE'
                )}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        }
      }
    };
    const handleClick = () => {
      inputRef.current?.focus();
    };

    return (
      <>
        <TooltipModal.Title>
          <MD isBold style={{ marginBottom: appTheme.space.sm }}>
            {t('__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_TITLE')}
          </MD>
        </TooltipModal.Title>
        <TooltipModal.Body>
          <Label htmlFor="title-input">
            {t('__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_LABEL')}
            <span style={{ color: appTheme.palette.red[500] }}>*</span>
          </Label>
          <Input
            ref={inputRef}
            id="title-input"
            onClick={handleClick}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          {error && (
            <Message
              validation="error"
              style={{ marginTop: appTheme.space.xs }}
            >
              {error}
            </Message>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: `${appTheme.space.md} 0 0 0`,
            }}
          >
            <Paragraph style={{ margin: 0 }}>
              <SM>
                <Trans
                  i18nKey="__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_DESCRIPTION"
                  values={{ usageNumber }}
                  count={Number(usageNumber)}
                />
              </SM>
            </Paragraph>
            <Button
              size="small"
              disabled={!!error}
              isPrimary
              isAccent
              onClick={handleSubmit}
            >
              <Button.StartIcon>
                <SaveIcon />
              </Button.StartIcon>
              {t('__VIDEO_PAGE_DROPDOWN_EDIT_MODAL_SAVE_BUTTON')}
            </Button>
          </div>
        </TooltipModal.Body>
      </>
    );
  };

  return (
    <Field>
      <Autocomplete
        data-qa="video-title-dropdown"
        isEditable
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
        options={[
          {
            id: 'id',
            label: 'select or create',
            options: (titles || []).map((i) => {
              return {
                id: i.id.toString(),
                value: i.id.toString(),
                label: `${i.name} (${i.usageNumber})`,
                isSelected: formProps.values.title === i.id,
                actions: editModal,
                itemID: i.id.toString(),
              };
            }),
          },
        ]}
        startIcon={<CopyIcon />}
        placeholder={t(
          '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_PLACEHOLDER'
        )}
      />
    </Field>
  );
};
