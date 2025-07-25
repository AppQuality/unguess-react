import { MD, SM, TooltipModal } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import { getModulesByTab } from 'src/pages/Plan/modules/Factory';
import styled from 'styled-components';
import { usePlanContext } from '../../../context/planContext';
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
  const { activeTab } = usePlanContext();
  const availableModules = getModulesByTab(activeTab);
  const { currentModules } = useAppSelector((state) => state.planModules);

  const items = availableModules.map((module_type) => {
    if (currentModules.find((module) => module === module_type)) {
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
      role="dialog"
      data-qa="plans-nav-add-block-dialog"
      referenceElement={modalRef}
      onClose={() => setModalRef(null)}
      placement="top-start"
      hasArrow={false}
      appendToNode={document.body}
    >
      <TooltipModal.Title>
        <MD isBold>{t('__PLAN_PAGE_ADD_MODULE_BLOCK_MODAL_TITLE')}</MD>
        <SM style={{ color: appTheme.palette.grey[600] }}>
          {t('__PLAN_PAGE_ADD_MODULE_BLOCK_MODAL_SUBTITLE')}
        </SM>
      </TooltipModal.Title>
      <TooltipModal.Body style={{ maxHeight: '75vh', overflowY: 'auto' }}>
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
