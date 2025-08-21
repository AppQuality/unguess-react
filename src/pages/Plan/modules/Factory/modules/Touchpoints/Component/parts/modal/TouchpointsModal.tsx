import { MD, Tabs, TooltipModal } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { components } from 'src/common/schema';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { useModuleTouchpointsContext } from '../../context';
import { useModuleTouchpoints } from '../../hooks';
import { AppTouchpoints } from './AppTouchpoints';
import { WebTouchpoints } from './WebTouchpoints';

const StyledTabs = styled(Tabs)`
  > button {
    width: 33.33%;
  }
`;

const TouchpointsModal = () => {
  const { t } = useTranslation();
  const { variant, setVariant } = useModuleTouchpoints();
  const { modalRef, setModalRef } = useModuleTouchpointsContext();
  const { hasFeatureFlag } = useFeatureFlag();

  const selectActiveVariant = (index: number) => {
    switch (index) {
      case 0:
        return 'default';
      case 1:
        return 'web';
      case 2:
        return 'app';
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
      case 'web':
        return 1;
      case 'app':
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
    >
      <TooltipModal.Title>
        <MD isBold>
          {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_MODAL_TITLE')}
        </MD>
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
            title={t(
              '__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_MODAL_DEFAULT_TAB'
            )}
          >
            <WebTouchpoints />
            <Divider style={{ marginBottom: appTheme.space.md }} />
            <AppTouchpoints />
          </Tabs.Panel>
          <Tabs.Panel
            key="web"
            title={t('__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_WEB_TAB')}
          >
            <WebTouchpoints />
          </Tabs.Panel>
          <Tabs.Panel
            key="app"
            title={t('__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_APP_TAB')}
          >
            <AppTouchpoints />
          </Tabs.Panel>
        </StyledTabs>
      </TooltipModal.Body>
    </TooltipModal>
  );
};

export { TouchpointsModal };
