import { MD, SM, TooltipModal } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import styled from 'styled-components';
import { usePlanTab } from '../../../context/planContext';
import { MODULES_BY_TAB } from '../../../modulesMap';
import { usePlanNavContext } from '../context';
import { AddBlockModalItem } from './AddBlockModalItem';

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  align-items: flex-start;
  padding: ${({ theme }) => `${theme.space.sm} 0`};

  > button {
    width: auto;
  }
`;

const AddBlockModal = () => {
  const { t } = useTranslation();
  const { modalRef, setModalRef } = usePlanNavContext();
  const { activeTab } = usePlanTab();
  const availableModules =
    MODULES_BY_TAB[activeTab as keyof typeof MODULES_BY_TAB] || [];
  const { getModules } = useModuleConfiguration();

  const items = availableModules.map((module_type) => {
    if (getModules().find((module) => module.type === module_type)) {
      return {
        type: module_type as components['schemas']['Module']['type'],
        enabled: false,
      };
    }

    return {
      type: module_type as components['schemas']['Module']['type'],
      enabled: true,
    };
  });

  const disabled = items.filter((item) => item.enabled).length === 0;

  if (!modalRef || disabled) {
    return null;
  }

  return (
    <TooltipModal
      referenceElement={modalRef}
      onClose={() => setModalRef(null)}
      placement="top-start"
      hasArrow={false}
    >
      <TooltipModal.Title>
        <MD isBold>{t('__PLAN_PAGE_ADD_MODULE_BLOCK_MODAL_TITLE')}</MD>
        <SM style={{ color: appTheme.palette.grey[600] }}>
          {t('__PLAN_PAGE_ADD_MODULE_BLOCK_MODAL_SUBTITLE')}
        </SM>
      </TooltipModal.Title>
      <TooltipModal.Body>
        <ButtonsContainer>
          {items.map((item) => (
            <AddBlockModalItem key={item.type} item={item} />
          ))}
        </ButtonsContainer>
      </TooltipModal.Body>
    </TooltipModal>
  );
};

export { AddBlockModal };
