import {
  Button,
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
import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as SaveIcon } from 'src/assets/icons/save.svg';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  usePatchCampaignsByCidVideoTagsAndTagIdMutation,
} from 'src/features/api';

interface EditModalProps {
  tag: GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number];
  closeModal: () => void;
}

export const EditTagModal = ({ closeModal, tag }: EditModalProps) => {
  // Extract both the current title and the usage number in parentheses in two variables

  const [newName, setNewName] = useState(tag.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [patchVideoTag] = usePatchCampaignsByCidVideoTagsAndTagIdMutation({});
  const { addToast } = useToast();
  const { t } = useTranslation();
  const { campaignId } = useParams();

  useEffect(() => {
    if (newName.trim() === '') {
      setError(
        t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_REQUIRED_ERROR')
      );
    } else {
      setError(null);
    }
  }, [newName]);

  const handleSubmit = async () => {
    if (error) return;
    // Update the title in the form
    try {
      await patchVideoTag({
        cid: campaignId?.toString() || '0',
        tagId: tag.id.toString(),
        body: {
          newTagName: newName,
        },
      }).unwrap();
      closeModal();
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t(
              '__VIDEO_PAGE_DROPDOWN_EDIT_MODAL_SUCCESS_TOAST_MESSAGE'
            )}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    } catch (err: any) {
      // Handle error (e.g., show error toast)
      // if status code is 409, conflict with another already saved name, show specific error
      if (err.status === 409) {
        setError(
          t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_DUPLICATE_ERROR')
        );
      } else {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={t(
                '__VIDEO_PAGE_DROPDOWN_EDIT_MODAL_ERROR_TOAST_MESSAGE'
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
          {t('__VIDEO_PAGE_DROPDOWN_EDIT_MODAL_TITLE')}
        </MD>
      </TooltipModal.Title>
      <TooltipModal.Body>
        <Label htmlFor="title-input">
          {t('__VIDEO_PAGE_DROPDOWN_EDIT_MODAL_LABEL')}
          <span style={{ color: appTheme.palette.red[500] }}>*</span>
        </Label>
        <Input
          ref={inputRef}
          id="title-input"
          onClick={handleClick}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        {error && (
          <Message validation="error" style={{ marginTop: appTheme.space.xs }}>
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
                i18nKey="__VIDEO_PAGE_DROPDOWN_EDIT_MODAL_DESCRIPTION"
                values={{ usageNumber: tag.usageNumber }}
                count={Number(tag.usageNumber)}
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
