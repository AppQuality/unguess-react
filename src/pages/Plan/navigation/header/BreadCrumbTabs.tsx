import { Breadcrumb, Button } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { usePlanTab } from '../../context/planContext';

const StyledBreadcrumb = styled(Breadcrumb)`
  ol {
    justify-content: center;
  }
`;

export const BreadCrumbTabs = () => {
  const { activeTab, setActiveTab } = usePlanTab();
  return (
    <StyledBreadcrumb showLastArrow={false}>
      <Button
        isBasic
        size="small"
        isPrimary={activeTab === 'setup'}
        onClick={() => setActiveTab('setup')}
        data-qa="setup-tab"
      >
        Set Up
      </Button>
      <Button
        isBasic
        size="small"
        isPrimary={activeTab === 'target'}
        onClick={() => setActiveTab('target')}
        data-qa="target-tab"
      >
        Screen target
      </Button>
      <Button
        isBasic
        size="small"
        isPrimary={activeTab === 'instructions'}
        onClick={() => setActiveTab('instructions')}
        data-qa="instructions-tab"
      >
        Choose tasks
      </Button>
      <Button
        isBasic
        size="small"
        isPrimary={activeTab === 'summary'}
        disabled
        onClick={() => setActiveTab('summary')}
        data-qa="summary-tab"
      >
        Get expert response
      </Button>
    </StyledBreadcrumb>
  );
};
