import { Button } from '@appquality/unguess-design-system';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as PlusIcon } from 'src/assets/icons/plus-icon.svg';
import styled from 'styled-components';
import { useModuleTasksContext } from '../context';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.space.md};
`;

const AddTaskButton = () => {
  const { t } = useTranslation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { setModalRef } = useModuleTasksContext();

  return (
    <ButtonContainer>
      <Button
        isBasic
        isPill={false}
        ref={triggerRef}
        onClick={() => setModalRef(triggerRef.current)}
      >
        <Button.StartIcon>
          <PlusIcon />
        </Button.StartIcon>
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_BUTTON')}
      </Button>
    </ButtonContainer>
  );
};

export { AddTaskButton };
