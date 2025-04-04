import { Button } from '@appquality/unguess-design-system';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { ReactComponent as PlusIcon } from 'src/assets/icons/plus-icon.svg';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { usePlanTab } from '../../context/planContext';
import { MODULES_BY_TAB } from '../../modulesMap';
import { usePlanNavContext } from './context';

const AddBlockButton = () => {
  const { t } = useTranslation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { setModalRef } = usePlanNavContext();
  const { getPlanStatus } = useModuleConfiguration();
  const { activeTab } = usePlanTab();
  const availableModules =
    MODULES_BY_TAB[activeTab as keyof typeof MODULES_BY_TAB] || [];
  const { currentModules } = useAppSelector((state) => state.planModules);

  const items = availableModules.filter((module_type) => {
    if (currentModules.find((module) => module === module_type)) return false;
    return true;
  });

  return (
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
  );
};

export { AddBlockButton };
