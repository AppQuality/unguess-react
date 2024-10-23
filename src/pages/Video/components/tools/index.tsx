import { getLanguageNameByFullTag } from '@appquality/languages';
import {
  Button,
  IconButton,
  Notification,
  Span,
  Tooltip,
  useToast,
} from '@appquality/unguess-design-system';
import { ReactComponent as TranslateIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-fill.svg';
import { ReactComponent as SettingsIcon } from '@zendeskgarden/svg-icons/src/16/gear-fill.svg';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { usePostVideosByVidTranslationMutation } from 'src/features/api';
import { ToolsTranslate } from './ToolsTranslate';
import { useToolsContext } from './context/ToolsContext';
import { useTranslationTools } from './hooks/useTranslationTools';

export const Tools = () => {
  const { t } = useTranslation();
  const { videoId } = useParams();
  const { addToast } = useToast();
  const { isError, isProcessing, data } = useTranslationTools();
  const { isOpen, setIsOpen, setLanguage } = useToolsContext();
  const [requestTranslation] = usePostVideosByVidTranslationMutation();

  if (isError) return null;

  if (data.hasQuickTranslate && data.preferredLanguage) {
    // 2 buttons
    return (
      <div>
        <Button
          isBasic
          disabled={isProcessing || !data.canQuickTranslate}
          onClick={() => {
            if (!data.preferredLanguage) return;

            requestTranslation({
              vid: videoId || '',
              body: {
                language: data.preferredLanguage,
              },
            })
              .unwrap()
              .then(() => {
                setLanguage(data.preferredLanguage || '');
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
          }}
        >
          <Button.StartIcon>
            <TranslateIcon />
          </Button.StartIcon>
          <Span>
            {t('__TOOLS_MENU_ITEM_TRANSLATE_PREFERENCE_TITLE')}{' '}
            {getLanguageNameByFullTag(data.preferredLanguage)}
          </Span>
        </Button>
        {isOpen && (
          <ToolsTranslate
            {...(data.translation && {
              currentLanguage: data.translation.language,
            })}
          />
        )}        
        <Tooltip
          content={t('__TOOLS_MENU_ITEM_LANGUAGE_SETTINGS_TOOLTIP')}
          type="light"
          size="medium"
          onClick={(e: any) => {
            e.stopPropagation();
          }}
        >
          <IconButton
            disabled={isProcessing}
            style={{ marginLeft: appTheme.space.sm }}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <SettingsIcon color={appTheme.palette.blue[600]} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }

  // 1 button
  return (
    <div>
      <Button
        isBasic
        disabled={isProcessing}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Button.StartIcon>
          <TranslateIcon />
        </Button.StartIcon>
        {t('__TOOLS_MENU_ITEM_BUTTON_LABEL')}
      </Button>
      {isOpen && (
        <ToolsTranslate
          {...(data.translation && {
            currentLanguage: data.translation.language,
          })}
        />
      )}
    </div>
  );
};
