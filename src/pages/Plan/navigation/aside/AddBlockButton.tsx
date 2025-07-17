import { Button } from '@appquality/unguess-design-system';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { ReactComponent as PlusIcon } from 'src/assets/icons/plus-icon.svg';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import styled from 'styled-components';
import { usePlanContext } from '../../context/planContext';
import { getModulesByTab } from '../../modules/Factory';
import { usePlanNavContext } from './context';

const ButtonContainer = styled.div`
  padding-top: ${({ theme }) => theme.space.sm};
  padding-bottom: ${({ theme }) => theme.space.sm};
  padding-left: ${({ theme }) => theme.space.xxs};
  padding-right: ${({ theme }) => theme.space.xxs};
`;

const AddBlockButton = () => {
  const { t } = useTranslation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { setModalRef } = usePlanNavContext();
  const { getPlanStatus } = useModuleConfiguration();
  const { activeTab } = usePlanContext();
  const availableModules = getModulesByTab(activeTab.name);
  const { currentModules } = useAppSelector((state) => state.planModules);

  const items = availableModules.filter((module_type) => {
    if (currentModules.find((module) => module === module_type)) return false;
    return true;
  });

  return (
    <ButtonContainer>
      <Button
        isPrimary
        isPill={false}
        ref={triggerRef}
        onClick={() => setModalRef(triggerRef.current)}
        isStretched
        disabled={items.length === 0 || getPlanStatus() !== 'draft'}
      >
        <Button.StartIcon>
          <PlusIcon />
        </Button.StartIcon>
        {t('__PLAN_PAGE_ADD_MODULE_BLOCK_BUTTON')}
      </Button>
    </ButtonContainer>
  );
};

export { AddBlockButton };
