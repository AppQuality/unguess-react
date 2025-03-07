import { useTranslation } from 'react-i18next';
import { FormProvider } from 'src/features/modules/FormProvider';
import { Page } from 'src/features/templates/Page';
import { PlanProvider } from './context/planContext';
import PlanPageHeader from './navigation/Header';
import { PlanBody } from './PlanBody';

const Plan = () => {
  const { t } = useTranslation();

  return (
    <FormProvider>
      <PlanProvider>
        <Page
          title={t('__PLAN_PAGE_TITLE')}
          className="plan-page"
          pageHeader={<PlanPageHeader />}
          route="plan"
          isMinimal
        >
          <PlanBody />
        </Page>
      </PlanProvider>
    </FormProvider>
  );
};

export default Plan;
