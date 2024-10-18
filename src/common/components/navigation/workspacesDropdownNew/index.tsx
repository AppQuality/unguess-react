import {
  Autocomplete,
  DropdownFieldNew,
  HeaderItemText,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { id } from 'date-fns/locale';
import { useMemo } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { selectWorkspaces } from 'src/features/workspaces/selectors';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import styled from 'styled-components';

const BrandName = styled(HeaderItemText)`
    margin-right: ${({ theme }) => theme.space.sm}};
    ${(props) => retrieveComponentStyles('text.primary', props)};
    font-family: ${({ theme }) => theme.fonts.system};
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  `;

export const WorkspacesDropdown = () => {
  const { activeWorkspace } = useActiveWorkspace();
  const { userData: user } = useAppSelector((state) => state.user);
  const workspaces = useAppSelector(selectWorkspaces);

  if (!activeWorkspace || !user) return null;

  const options = useMemo(
    () =>
      workspaces.map((workspace) => ({
        ...workspace,
        label: workspace.company,
        value: workspace.id.toString(),
        id: workspace.id.toString(),
      })),
    [workspaces]
  );

  return workspaces.length > 1 ? (
    <div id="workspace-dropdown-item">
      <DropdownFieldNew>
        <Autocomplete options={options} />
      </DropdownFieldNew>
    </div>
  ) : (
    <BrandName>{`${activeWorkspace?.company}'s Workspace`}</BrandName>
  );
};
