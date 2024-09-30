import { Notification, useToast } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { usePostVideosByVidObservationsMutation } from 'src/features/api';
import { useVideoContext } from '../../context/VideoContext';

export const useAddObservation = ({ videoId }: { videoId: string }) => {
  const [postVideoByVidObservations] = usePostVideosByVidObservationsMutation();
  const { setOpenAccordion } = useVideoContext();
  const { addToast } = useToast();
  const { t } = useTranslation();

  const handleAddObservation = async (part: {
    from: number;
    to: number;
    text: string;
  }) => {
    const body = {
      start: part.from,
      end: part.to,
      text: part.text,
    };
    await postVideoByVidObservations({
      vid: videoId || '',
      body,
    })
      .unwrap()
      .then((res) => {
        setOpenAccordion({ id: res.id });
      })
      .catch((err) => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={t('__VIDEO_PAGE_PLAYER_ERROR_OBSERVATION')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      });
  };

  return handleAddObservation;
};
