import { ReactNode } from 'react';
import { appTheme } from 'src/app/theme';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { usePlanTab } from '../../context/planContext';
import { MODULES_BY_TAB } from '../../modulesMap';

const Nav = ({ button, modal }: { button?: ReactNode; modal?: ReactNode }) => {
  const { activeTab } = usePlanTab();
  const { getModules } = useModuleConfiguration();
  const items: any[] = [];
  const availableModules =
    MODULES_BY_TAB[activeTab as keyof typeof MODULES_BY_TAB] || [];

  getModules().forEach((module) => {
    if (availableModules.includes(module.type)) {
      items.push(module);
    }
  });

  console.log(items);

  if (activeTab === 'instructions') {
    // Show module tasks values
  } else {
    // Show modules
  }

  return (
    <>
      <div data-qa="plans-nav" style={{ marginBottom: appTheme.space.md }}>
        {/* {items.map((item) => (
        <NavItem item={item} />
      ))} */}
      </div>
      {button && button}
      {modal && modal}
    </>
  );
};

export { Nav };
