import { Breadcrumb, Button } from '@appquality/unguess-design-system';
import { usePlanTab } from '../context/planContext';

export const BreadCrumbTabs = () => {
  const { activeTab, setActiveTab } = usePlanTab();
  return (
    <Breadcrumb style={{ justifyContent: 'center' }}>
      <Button
        isBasic
        isPrimary={activeTab === 'setup'}
        onClick={() => setActiveTab('setup')}
      >
        Set Up
      </Button>
      <Button
        isBasic
        isPrimary={activeTab === 'target'}
        onClick={() => setActiveTab('target')}
      >
        Screen target
      </Button>
      <Button
        isBasic
        isPrimary={activeTab === 'instructions'}
        onClick={() => setActiveTab('instructions')}
      >
        Choose tasks
      </Button>
      <Button
        isBasic
        isPrimary={activeTab === 'summary'}
        disabled
        onClick={() => setActiveTab('summary')}
      >
        Get expert response
      </Button>
    </Breadcrumb>
  );
};
