import { Button } from '@appquality/unguess-design-system';
import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { usePatchPlansByPidStatusMutation } from 'src/features/api';

export const CancelPlanButton = ({
  size,
}: {
  size?: ComponentProps<typeof Button>['size'];
}) => {
  const [patchStatus, { isLoading }] = usePatchPlansByPidStatusMutation();
  const { t } = useTranslation();
  const { planId } = useParams();

  return (
    <Button
      isStretched
      size={size}
      isDanger
      disabled={isLoading}
      onClick={() => {
        patchStatus({
          pid: planId?.toString() ?? '',
          body: { status: 'draft' },
        }).unwrap();
      }}
    >
      {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_CANCEL_PLAN_CTA')}
    </Button>
  );
};
