import { Notification, useToast } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { usePostVideosByVidTranslationMutation } from 'src/features/api';
import { useToolsContext } from '../context/ToolsContext';

export const useRequestTranslation = ({
  language,
  videoId,
}: {
  language?: string;
  videoId: string;
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { setLanguage } = useToolsContext();

  const [requestTranslation] = usePostVideosByVidTranslationMutation();
  if (!language) return () => null;

  const translate = () => {
    requestTranslation({
      vid: videoId || '',
      body: {
        language,
      },
    })
      .unwrap()
      .then(() => {
        setLanguage(language);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);

        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={t('__TOOLS_TRANSLATE_TOAST_ERROR_MESSAGE')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      });
  };

  return translate;
};
