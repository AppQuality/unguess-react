import { Breadcrumb, Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import styled from 'styled-components';
import { usePlanTab } from '../../context/planContext';
import { MODULES_BY_TAB } from '../../modulesMap';

const StyledBreadcrumb = styled(Breadcrumb)`
  ol {
    justify-content: center;
  }
`;

export const BreadCrumbTabs = () => {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = usePlanTab();
  const { errors } = useAppSelector((state) => state.planModules);
  const { getPlanStatus } = useModuleConfiguration();

  const availableModules = MODULES_BY_TAB;

  const setupModules = availableModules.setup || [];
  const targetModules = availableModules.target || [];
  const instructionsModules = availableModules.instructions || [];

  const hasSetupErrors = setupModules.some(
    (module_type) =>
      (errors &&
        typeof errors === 'object' &&
        Object.keys(errors).some((key) => key.startsWith(module_type))) ??
      false
  );

  const hasTargetErrors = targetModules.some(
    (module_type) =>
      (errors &&
        typeof errors === 'object' &&
        Object.keys(errors).some((key) => key.startsWith(module_type))) ??
      false
  );

  const hasInstructionsErrors = instructionsModules.some(
    (module_type) =>
      (errors &&
        typeof errors === 'object' &&
        Object.keys(errors).some((key) => key.startsWith(module_type))) ??
      false
  );

  return (
    <StyledBreadcrumb showLastArrow={false}>
      <Button
        isBasic
        size="small"
        isPrimary={activeTab === 'setup'}
        onClick={() => setActiveTab('setup')}
        data-qa="setup-tab"
        {...(hasSetupErrors && { isDanger: true })}
      >
        {t('__PLAN_PAGE_HEADER_BREADCRUMBS_SETUP_TAB')}
      </Button>
      <Button
        isBasic
        size="small"
        isPrimary={activeTab === 'target'}
        onClick={() => setActiveTab('target')}
        data-qa="target-tab"
        {...(hasTargetErrors && { isDanger: true })}
      >
        {t('__PLAN_PAGE_HEADER_BREADCRUMBS_TARGET_TAB')}
      </Button>
      <Button
        isBasic
        size="small"
        isPrimary={activeTab === 'instructions'}
        onClick={() => setActiveTab('instructions')}
        data-qa="instructions-tab"
        {...(hasInstructionsErrors && { isDanger: true })}
      >
        {t('__PLAN_PAGE_HEADER_BREADCRUMBS_INSTRUCTIONS_TAB')}
      </Button>
      <Button
        isBasic
        size="small"
        isPrimary={activeTab === 'summary'}
        disabled={getPlanStatus() === 'draft'}
        onClick={() => setActiveTab('summary')}
        data-qa="summary-tab"
      >
        {t('__PLAN_PAGE_HEADER_BREADCRUMBS_SUMMARY_TAB')}
      </Button>
    </StyledBreadcrumb>
  );
};
