import { MD, SM, TooltipModal } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { components } from 'src/common/schema';
import { MODULE_GROUPS } from 'src/pages/Plan/common/constants';
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
  const { currentModules } = useAppSelector((state) => state.planModules);
  const groupConfig = MODULE_GROUPS[activeTab.name] || [];

  // Build grouped items with enabled/disabled state
  const groupedItems = groupConfig.map((group) => {
    const items = group.modules.map((module_type) => ({
      type: module_type as components['schemas']['Module']['type'],
      enabled: !currentModules.includes(module_type),
    }));
    return {
      id: group.id,
      title: group.title,
      items,
    };
  });

  if (!modalRef) {
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
      <Divider style={{ marginTop: appTheme.space.md, marginBottom: 0 }} />
      <TooltipModal.Body
        style={{ maxHeight: '75vh', overflowY: 'auto', paddingTop: 0 }}
      >
        {groupedItems.map((group) => (
          <div key={group.id} style={{ marginBottom: appTheme.space.md }}>
            <SM
              isBold
              color={appTheme.palette.grey[600]}
              style={{
                marginBottom: appTheme.space.xs,
                textTransform: 'uppercase',
              }}
            >
              {t(group.title)}
            </SM>
            <ButtonsContainer>
              {group.items.map((item) => (
                <AddBlockModalItem key={item.type} item={item} />
              ))}
            </ButtonsContainer>
          </div>
        ))}
      </TooltipModal.Body>
    </TooltipModal>
  );
};

export { AddBlockModal };
