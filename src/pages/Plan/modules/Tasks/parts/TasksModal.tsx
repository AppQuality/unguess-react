import { MD, Tabs, TooltipModal } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Divider } from 'src/common/components/divider';
import styled from 'styled-components';
import { ExperientialTasks } from './ExperientialTasks';
import { FunctionalTasks } from './FunctionalTasks';
import { SurveyTasks } from './SurveyTasks';
import { useModuleTasksContext } from '../context';

const StyledTabs = styled(Tabs)`
  > button {
    width: 33.33%;
  }
`;

const TasksModal = () => {
  const { t } = useTranslation();
  const { modalRef, setModalRef } = useModuleTasksContext();

  return (
    <TooltipModal
      referenceElement={modalRef}
      onClose={() => setModalRef(null)}
      placement="auto"
      hasArrow={false}
    >
      <TooltipModal.Title>
        <MD isBold>{t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_TITLE')}</MD>
      </TooltipModal.Title>
      <TooltipModal.Body>
        <StyledTabs>
          <Tabs.Panel
            key="all"
            title={t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_ALL_TAB')}
            // TODO: set variant on tab click
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
