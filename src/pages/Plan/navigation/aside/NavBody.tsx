import { useAppSelector } from 'src/app/hooks';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { NavContainer } from '../../common/NavContainer';
import { usePlanTab } from '../../context/planContext';
import { MODULES_BY_TAB } from '../../modulesMap';
import { AddBlockButton } from './AddBlockButton';
import { MODULES_WITH_OUTPUT } from './const';
import { AddBlockModal } from './modal/AddBlockModal';
import { NavItem } from './NavItem';
import { NavItemChildren } from './NavItemChildren';

const BodyContainer = styled.div`
  max-height: calc(100vh - ${({ theme }) => theme.space.xxl});
  overflow-y: auto;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const NavBody = () => {
  const { activeTab } = usePlanTab();
  const availableModules =
    MODULES_BY_TAB[activeTab as keyof typeof MODULES_BY_TAB] || [];
  const { getPlanStatus } = useModuleConfiguration();
  const { currentModules } = useAppSelector((state) => state.planModules);
  const { hasFeatureFlag } = useFeatureFlag();
  const { t } = useTranslation();

  return (
    <NavContainer data-qa="plans-nav">
      <MD
        color={appTheme.palette.grey['600']}
        style={{ marginBottom: appTheme.space.md }}
      >
        {t('__PLAN_ASIDE_NAVIGATION_MODULES_TITLE')}
      </MD>
      <BodyContainer data-qa={`plans-nav-${activeTab}`}>
        {currentModules
          .filter((module) => availableModules.includes(module))
          .map((module) => (
            <NavItem type={module}>
              {MODULES_WITH_OUTPUT.includes(module) && (
                <NavItemChildren key={module} type={module} />
              )}
            </NavItem>
          ))}
      </BodyContainer>
      {getPlanStatus() === 'draft' &&
        hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
          <div style={{ marginTop: 'auto' }}>
            <AddBlockButton />
            <AddBlockModal />
          </div>
        )}
    </NavContainer>
  );
};

export { NavBody };
