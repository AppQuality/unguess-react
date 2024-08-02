import {
  Button,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import {
  GetCampaignsByCidInsightsApiResponse,
  usePatchInsightsByIidMutation,
} from 'src/features/api';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useState } from 'react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { InsightFormValues } from '../../FormProvider';

export const ButtonsFooter = ({
  insight,
}: {
  insight: GetCampaignsByCidInsightsApiResponse[number];
}) => {
  const { t } = useTranslation();
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const { isSubmitting, setValues } = useFormikContext<InsightFormValues>();
  const { addToast } = useToast();
  const [patchInsight] = usePatchInsightsByIidMutation();
  const handlePublish = () => {
    let notificationProps = {};
    const { id, title, visible: isPublished } = insight;
    patchInsight({ iid: id.toString(), body: { visible: isPublished ? 0 : 1 } })
      .unwrap()
      .then(() => {
        notificationProps = {
          type: 'success',
          message: isPublished
            ? `${`Scoperta "${title}" ${t('_TOAST_UNPUBLISHED_MESSAGE')}`}`
            : `${`Scoperta "${title}" ${t('_TOAST_PUBLISHED_MESSAGE')}`}`,
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
  };
  return (
    <div
      style={{ paddingTop: appTheme.space.xs, marginBottom: appTheme.space.lg }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          gap: appTheme.space.sm,
        }}
      >
        <span>
          <Button
            isBasic
            isDanger
            disabled={isSubmitting}
            onClick={() => setConfirmDeleteModalOpen(true)}
          >
            {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_DELETE')}
          </Button>
        </span>
        <Button
          isBasic
          onClick={() =>
            setValues({
              ...insight,
              severity: insight.severity.id,
              observations: insight.observations.map((o) => ({
                ...o,
                uploaderId: o.uploaderId,
                mediaId: o.video.id,
                deviceType: o.video.deviceType,
                usecaseTitle: o.usecaseTitle,
              })),
            })
          }
        >
          {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_EDIT')}
        </Button>
        <Button
          isPrimary={!insight.visible}
          isAccent={!insight.visible}
          onClick={handlePublish}
        >
          {insight.visible
            ? t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_UNPUBLISH')
            : t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_PUBLISH')}
        </Button>
      </div>
      {confirmDeleteModalOpen && (
        <ConfirmDeleteModal
          insightId={insight.id}
          title={insight.title}
          setIsConfirmationModalOpen={setConfirmDeleteModalOpen}
        />
      )}
    </div>
  );
};
