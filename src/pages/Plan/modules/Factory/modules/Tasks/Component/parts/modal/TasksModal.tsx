import { MD, Tabs, TooltipModal } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { components } from 'src/common/schema';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { useModuleTasksContext } from '../../context';
import { useModuleTasks } from '../../hooks';
import { AccessibilityTasks } from './AccessibilityTasks';
import { AiGeneratorSection } from './AiGeneratorSection';
import { CreateTaskListsWithAI } from './CreateTaskListsWithAI';
import { CreateVideoTasksWithAI } from './CreateVideoTasksWithAI';
import { ExperientialTasks } from './ExperientialTasks';
import { FunctionalTasks } from './FunctionalTasks';
import { SurveyTasks } from './SurveyTasks';

const StyledTabs = styled(Tabs)`
  display: flex;
`;

const StyledTabsPanel = styled(Tabs.Panel)`
  max-height: 350px;
  overflow-y: scroll;
`;

const TasksModal = () => {
  const { t } = useTranslation();
  const { variant, setVariant } = useModuleTasks();
  const {
    modalRef,
    setModalRef,
    setIsOpenCreateTasksWithAIModal,
    setIsOpenCreateVideoTasksWithAIModal,
    isOpenCreateTasksWithAIModal,
    isOpenCreateVideoTasksWithAIModal,
  } = useModuleTasksContext();
  const { hasFeatureFlag } = useFeatureFlag();

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
    <>
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
              ? {
                  onTabChange: (index) =>
                    setVariant(selectActiveVariant(index)),
                }
              : { style: { display: 'none' } })}
            {...(variant && { selectedIndex: getActiveVariantIndex(variant) })}
          >
            <StyledTabsPanel
              key="default"
              title={t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_DEFAULT_TAB')}
            >
              <FunctionalTasks />
              <ExperientialTasks />
              <SurveyTasks />
              <AccessibilityTasks />
            </StyledTabsPanel>
            <StyledTabsPanel
              key="functional"
              title={t(
                '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TAB'
              )}
            >
              <FunctionalTasks>
                <AiGeneratorSection
                  onOpenCreateWithAI={() =>
                    setIsOpenCreateTasksWithAIModal(true)
                  }
                />
                <Divider />
              </FunctionalTasks>
              <Divider />
              <SurveyTasks />
            </StyledTabsPanel>
            <StyledTabsPanel
              key="experiential"
              title={t(
                '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_EXPERIENTIAL_TAB'
              )}
            >
              <ExperientialTasks>
                <AiGeneratorSection
                  onOpenCreateWithAI={() =>
                    setIsOpenCreateVideoTasksWithAIModal(true)
                  }
                  checkApiHealth={false}
                  label={
                    <Trans
                      i18nKey="__PLAN_PAGE_MODULE_TASKS_ADD_VIDEO_TASK_MODAL_AI_DISCLAIMER"
                      components={{
                        bold: <MD isBold />,
                      }}
                    />
                  }
                />
                <Divider />
              </ExperientialTasks>
              <Divider />
              <SurveyTasks />
            </StyledTabsPanel>
            <StyledTabsPanel
              key="accessibility"
              title={t(
                '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_ACCESSIBILITY_TAB'
              )}
            >
              <AccessibilityTasks />
            </StyledTabsPanel>
          </StyledTabs>
        </TooltipModal.Body>
      </TooltipModal>
      {isOpenCreateTasksWithAIModal && <CreateTaskListsWithAI />}
      {isOpenCreateVideoTasksWithAIModal && <CreateVideoTasksWithAI />}
    </>
  );
};

export { TasksModal };
