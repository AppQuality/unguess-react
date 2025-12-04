import { Button, MD } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ProjectDropdown } from './parts/projectDropdown';

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: column;
  padding: 0 8px;
  gap: 12px;
`;

export const ProjectSuspendPart = ({
  key,
  handleSubmit,
  children,
}: {
  key: string;
  handleSubmit: (id: number) => void;
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const [projectId, setProjectId] = useState<number | null>(null);

  return (
    <DropdownContainer key={key}>
      <MD isBold>
        {children ?? t('__TEMPLATES_DRAWER_PROJECT_DROPDOWN_LABEL')}
      </MD>
      <ProjectDropdown projectId={projectId} setProjectId={setProjectId} />
      <Button
        disabled={!projectId}
        isStretched
        onClick={() => projectId && handleSubmit(projectId)}
      >
        Confirm
      </Button>
    </DropdownContainer>
  );
};
