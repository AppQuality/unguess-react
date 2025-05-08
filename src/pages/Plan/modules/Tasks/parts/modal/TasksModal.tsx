import { MD, Tabs, TooltipModal } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Divider } from 'src/common/components/divider';
import { components } from 'src/common/schema';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { useModuleTasksContext } from '../../context';
import { useModuleTasks } from '../../hooks';
import { ExperientialTasks } from './ExperientialTasks';
import { FunctionalTasks } from './FunctionalTasks';
import { SurveyTasks } from './SurveyTasks';

const StyledTabs = styled(Tabs)`
  > button {
    width: 33.33%;
  }
`;

const TasksModal = () => {
  const { t } = useTranslation();
  const { variant, setVariant } = useModuleTasks();
  const { modalRef, setModalRef } = useModuleTasksContext();
  const { hasFeatureFlag } = useFeatureFlag();

  const selectActiveVariant = (index: number) => {
    switch (index) {
      case 0:
        return 'default';
      case 1:
        return 'functional';
      case 2:
        return 'experiential';
      default:
        return 'default';
    }
  };

  const getActiveVariantIndex = (
    v: components['schemas']['Module']['variant']
  ) => {
    switch (v) {
      case 'default':
        return 0;
      case 'functional':
        return 1;
      case 'experiential':
        return 2;
      default:
        return 0;
    }
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
        <MD isBold>{t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_TITLE')}</MD>
      </TooltipModal.Title>
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
            <Divider />
            <ExperientialTasks />
            <Divider />
            <SurveyTasks />
          </Tabs.Panel>
          <Tabs.Panel
            key="functional"
            title={t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TAB')}
          >
            <FunctionalTasks />
            <Divider />
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
        </StyledTabs>
      </TooltipModal.Body>
    </TooltipModal>
  );
};

export { TasksModal };
