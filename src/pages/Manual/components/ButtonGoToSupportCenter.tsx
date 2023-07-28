import { Button } from '@appquality/unguess-design-system';
import { ReactComponent as NewWindowIcon } from '@zendeskgarden/svg-icons/src/16/new-window-stroke.svg';
import { useTranslation } from 'react-i18next';
import i18n from 'src/i18n';

export const ButtonGoToSupportCenter = () => {
  const { t } = useTranslation();
  const goToSupportCenter = () =>
    window.open(
      `https://docs.unguess.io${
        i18n.language !== 'en' ? `/${i18n.language}` : ''
      }`,
      '_blank'
    );

  return (
    <Button
      isPrimary
      isAccent
      style={{ marginTop: 36 }}
      onClick={goToSupportCenter}
    >
      <Button.StartIcon>
        <NewWindowIcon />
      </Button.StartIcon>
      {t('__PUBLIC_MANUAL_HELP_MODAL_BUTTON_SUPPORT_CENTER')}
    </Button>
  );
};
