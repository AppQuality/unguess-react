import { Notification, useToast } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { GetPlansByPidApiResponse } from 'src/features/api';
import { usePlanContext } from './context/planContext';
import PlanPageHeader from './navigation/header/Header';
import { PlanBody } from './PlanBody';

export const PlanPageContent = ({
  plan,
}: {
  plan: GetPlansByPidApiResponse | undefined;
}) => {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = usePlanContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToast } = useToast();

  useEffect(() => {
    if (!plan) return;

    if (activeTab.name !== 'summary' && plan.status !== 'draft') {
      setActiveTab('summary');
    }
  }, [plan?.status]);

  useEffect(() => {
    if (searchParams.get('payment') === 'success') {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t('__PLAN_PAGE_PURCHASE_SUCCESS')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
      searchParams.delete('payment');
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <>
      <PlanPageHeader />
      <PlanBody />
    </>
  );
};
