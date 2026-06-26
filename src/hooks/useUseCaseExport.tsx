import { Notification, useToast } from '@appquality/unguess-design-system';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';

/**
 * Triggers the WordPress "research report" export for a campaign/use case and
 * surfaces success/error toasts. Shared between the Insights page header and the
 * EntityPage insights CTA so the export behaves identically in both places.
 */
export const useUseCaseExport = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();

  const handleUseCaseExport = (entityId: string | number) => {
    fetch(`${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify({
        id: entityId,
        action: 'ug_generate_research_report',
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          window.location.href = `${process.env.REACT_APP_CROWD_WP_URL}/wp-content/themes/unguess/report/temp/${res.data.file}`;
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="success"
                message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_SUCCESS_MESSAGE')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        } else {
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="error"
                message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_ERROR_MESSAGE')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        }
      })
      .catch((e) => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_ERROR_MESSAGE')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        // eslint-disable-next-line no-console
        console.error(e.message);
      });
  };

  return { handleUseCaseExport };
};
