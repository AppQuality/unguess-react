import { Button } from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { ReactComponent as Published } from '@zendeskgarden/svg-icons/src/16/lock-unlocked-fill.svg';
import { ReactComponent as NotPublished } from '@zendeskgarden/svg-icons/src/16/lock-locked-stroke.svg';
import { GetCampaignsByCidInsightsApiResponse } from 'src/features/api';
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

  return (
    <>
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
                uploaderId: 0,
                mediaId: o.video.id,
                deviceType: '',
                usecaseTitle: '',
              })),
            })
          }
        >
          {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_EDIT')}
        </Button>
        <Button isPrimary isAccent onClick={() => {}}>
          {insight.visible ? (
            <span>
              <Published /> {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_UNPUBLISH')}
            </span>
          ) : (
            <span>
              <NotPublished />{' '}
              {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_PUBLISH')}
            </span>
          )}
        </Button>
      </div>
      {confirmDeleteModalOpen && (
        <ConfirmDeleteModal
          insightId={insight.id}
          title={insight.title}
          setIsConfirmationModalOpen={setConfirmDeleteModalOpen}
        />
      )}
    </>
  );
};