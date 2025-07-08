import { MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import styled from 'styled-components';
import { NavContainer } from '../../common/NavContainer';
import { usePlanContext } from '../../context/planContext';
import { getModuleBySlug, getModulesByTab } from '../../modules/Factory';
import { AddBlockButton } from './AddBlockButton';
import { AddBlockModal } from './modal/AddBlockModal';
import { NavItem } from './NavItem';

const BodyContainer = styled.div`
  max-height: calc(100vh - ${({ theme }) => theme.space.xxl});
  overflow-y: auto;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const ChildrenContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.space.xs};
  padding-top: ${({ theme }) => theme.space.xs};
`;

const NavBody = () => {
  const { activeTab } = usePlanContext();
  const availableModules = getModulesByTab(activeTab);
  const { getPlanStatus } = useModuleConfiguration();
  const { currentModules } = useAppSelector((state) => state.planModules);
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
          .map((module) => {
            const { NavChildren } = getModuleBySlug(module);
            return (
              <div key={module}>
                <NavItem type={module}>
                  {NavChildren && (
                    <ChildrenContainer>
                      <NavChildren />
                    </ChildrenContainer>
                  )}
                </NavItem>
              </div>
            );
          })}
      </BodyContainer>
      {getPlanStatus() === 'draft' && (
        <div style={{ marginTop: 'auto' }}>
          <AddBlockButton />
          <AddBlockModal />
        </div>
      )}
    </NavContainer>
  );
};

export { NavBody };
