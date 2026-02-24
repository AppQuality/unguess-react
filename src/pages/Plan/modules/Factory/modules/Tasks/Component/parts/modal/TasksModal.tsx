import {
  Button,
  MD,
  Tabs,
  TooltipModal,
} from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AiIcon } from 'src/assets/icons/ai-icon.svg';
import { Divider } from 'src/common/components/divider';
import { components } from 'src/common/schema';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useGetServicesApiKHealthQuery } from 'src/features/api';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useCanShowAiChat } from 'src/pages/Dashboard/hooks/useCanShowAiChat';
import styled from 'styled-components';
import { useModuleTasksContext } from '../../context';
import { useModuleTasks } from '../../hooks';
import { AccessibilityTasks } from './AccessibilityTasks';
import { ExperientialTasks } from './ExperientialTasks';
import { FunctionalTasks } from './FunctionalTasks';
import { SurveyTasks } from './SurveyTasks';

const StyledTabs = styled(Tabs)`
  display: flex;
`;

const TasksModal = () => {
  const { t } = useTranslation();
  const { variant, setVariant } = useModuleTasks();
  const { modalRef, setModalRef, setIsOpenCreateTasksWithAIModal } =
    useModuleTasksContext();
  const { hasFeatureFlag } = useFeatureFlag();
  const { data: apiK_HealthResponse } = useGetServicesApiKHealthQuery();
  const canShowChat = useCanShowAiChat();
  const canShowAiFeatures = useMemo(
    () =>
      canShowChat &&
      apiK_HealthResponse?.success &&
      apiK_HealthResponse?.status === 'healthy',
    [apiK_HealthResponse, canShowChat]
  );
  const variants = [
    'default',
    'functional',
    'experiential',
    'accessibility',
  ] as const;

  const selectActiveVariant = (index: number) => variants[`${index}`];

  const getActiveVariantIndex = (
    v: components['schemas']['Module']['variant']
  ) => {
    const index = variants.findIndex((item) => item === v);
    if (index === -1) {
      return 0;
    }
    return index;
  };

  return (
    <TooltipModal
      referenceElement={modalRef}
      onClose={() => setModalRef(null)}
      placement="auto"
      hasArrow={false}
      role="dialog"
    >
      <TooltipModal.Title>
        <MD isBold style={{ marginBottom: appTheme.space.sm }}>
          {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_TITLE')}
        </MD>
      </TooltipModal.Title>
      <Divider />
      <TooltipModal.Body>
        <StyledTabs
          {...(hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS)
            ? { onTabChange: (index) => setVariant(selectActiveVariant(index)) }
            : { style: { display: 'none' } })}
          {...(variant && { selectedIndex: getActiveVariantIndex(variant) })}
        >
          <Tabs.Panel
            key="default"
            title={t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_DEFAULT_TAB')}
          >
            <FunctionalTasks />
            <ExperientialTasks />
            <SurveyTasks />
            <AccessibilityTasks />
            {canShowAiFeatures && (
              <div style={{ marginBottom: appTheme.space.md }}>
                <MD
                  style={{
                    paddingTop: appTheme.space.sm,
                    marginBottom: appTheme.space.md,
                  }}
                >
                  <Trans
                    i18nKey="__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_AI_DISCLAIMER"
                    components={{
                      bold: <MD isBold />,
                    }}
                  />
                </MD>
                <Button
                  onClick={() => setIsOpenCreateTasksWithAIModal(true)}
                  isPill={false}
                >
                  <Button.StartIcon>
                    <AiIcon />
                  </Button.StartIcon>
                  {t(
                    '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_BUTTON'
                  )}
                </Button>
              </div>
            )}
          </Tabs.Panel>
          <Tabs.Panel
            key="functional"
            title={t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TAB')}
          >
            <FunctionalTasks />

            <SurveyTasks />
          </Tabs.Panel>
          <Tabs.Panel
            key="experiential"
            title={t(
              '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_EXPERIENTIAL_TAB'
            )}
          >
            <ExperientialTasks />
            <Divider />
            <SurveyTasks />
          </Tabs.Panel>
          <Tabs.Panel
            key="accessibility"
            title={t(
              '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_ACCESSIBILITY_TAB'
            )}
          >
            <AccessibilityTasks />
          </Tabs.Panel>
        </StyledTabs>
      </TooltipModal.Body>
    </TooltipModal>
  );
};

export { TasksModal };
