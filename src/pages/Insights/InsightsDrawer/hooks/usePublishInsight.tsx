import { useToast, Notification } from '@appquality/unguess-design-system';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePatchInsightsByIidMutation } from 'src/features/api';

interface Props {
  title: string;
  id: string;
  isPublished?: number;
}

export const usePublishInsight = ({ title, id, isPublished }: Props) => {
  const [patchInsight, result] = usePatchInsightsByIidMutation();
  const { addToast } = useToast();
  const { t } = useTranslation();
  const handlePublish = useCallback(() => {
    let notificationProps = {};
    patchInsight({ iid: id, body: { visible: isPublished ? 0 : 1 } })
      .unwrap()
      .then(() => {
        notificationProps = {
          type: 'success',
          message: isPublished
            ? `Insight "${title}" succesfully unpublished`
            : `Insight "${title}" succesfully published`,
        };
      })
      .catch((e) => {
        notificationProps = {
          type: 'error',
          message: e.message ? e.message : t('_TOAST_GENERIC_ERROR_MESSAGE'),
        };
      })
      .finally(() => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              closeText="X"
              isPrimary
              {...notificationProps}
            />
          ),
          { placement: 'top' }
        );
      });
  }, [addToast, id, isPublished, patchInsight, title]);

  return { handlePublish, result };
};
