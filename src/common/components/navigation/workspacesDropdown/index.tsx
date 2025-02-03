import {
  Autocomplete,
  DropdownFieldNew,
  Ellipsis,
  HeaderItemText,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { ReactComponent as WorkspacesIcon } from 'src/assets/icons/workspace-icon.svg';
import API from 'src/common/api';
import { Workspace } from 'src/features/api';
import { saveWorkspaceToLs } from 'src/features/navigation/cachedStorage';
import {
  closeSidebar,
  setWorkspace,
} from 'src/features/navigation/navigationSlice';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { selectWorkspaces } from 'src/features/workspaces/selectors';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';

const StyledEllipsis = styled(Ellipsis)<{ isCompact?: boolean }>`
  ${({ theme, isCompact }) =>
    isCompact &&
    `
      width: ${theme.components.chrome.nav.workspaceDropdownWidth}px; 
    `}
  text-align: start;
  ${(props) => retrieveComponentStyles('text.primary', props)};
`;

const useOptions = () => {
  const workspaces = useAppSelector(selectWorkspaces);
  const sharedWorkspace = workspaces.filter((ws) => ws.isShared);
  const personalWorkspaces = workspaces.filter((ws) => !ws.isShared);

  return {
    isSingle: workspaces.length === 1,
    options: [
      ...(personalWorkspaces && personalWorkspaces.length
        ? [
            {
              id: 'personal',
              label: 'Personal workspaces',
              options: personalWorkspaces.map((ws) => ({
                id: ws.id.toString(),
                label: ws.company,
                value: ws,
              })),
            },
          ]
        : []),
      ...(sharedWorkspace && sharedWorkspace.length
        ? [
            {
              id: 'shared',
              label: 'Shared workspaces',
              options: sharedWorkspace.map((ws) => ({
                id: ws.id.toString(),
                label: ws.company,
                value: ws,
              })),
            },
          ]
        : []),
    ],
  };
};

const Wrapper = styled.div<{ isExpanded: boolean }>`
  [data-garden-id='dropdowns.combobox.value'][hidden] {
    ${({ isExpanded }) => !isExpanded && 'display: inherit !important;'}
  }
`;

const BrandName = styled(HeaderItemText)`
    margin-right: ${({ theme }) => theme.space.sm}};
    ${(props) => retrieveComponentStyles('text.primary', props)};
    font-family: ${({ theme }) => theme.fonts.system};
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  `;

export const WorkspacesDropdown = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { activeWorkspace } = useActiveWorkspace();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { isSingle, options } = useOptions();
  const navigate = useNavigate();
  const homeRoute = useLocalizeRoute('');
  const sendGTMEvent = useSendGTMevent();

  const toggleGtmWorkspaceChange = () => {
    sendGTMEvent({
      event: 'workspaces-action',
      action: 'workspace_change',
    });
  };

  const handleWorkspaceChange = (workspace: Workspace) => {
    if (workspace.id !== activeWorkspace?.id) {
      saveWorkspaceToLs(workspace);
      API.workspacesById(workspace.id).then((ws) => {
        dispatch(setWorkspace(ws));
        toggleGtmWorkspaceChange();
        dispatch(closeSidebar());
        navigate(homeRoute, { replace: true });
      });
    }
  };

  if (!activeWorkspace) return null;

  if (isSingle)
    return <BrandName>{`${activeWorkspace?.company}'s Workspace`}</BrandName>;

  return (
    <Wrapper ref={ref} isExpanded={isExpanded}>
      <DropdownFieldNew>
        <Autocomplete
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          onBlur={(e) => {
            if (!ref.current?.contains(e.relatedTarget as Node)) {
              setIsExpanded(false);
            }
          }}
          isExpanded={isExpanded}
          inputProps={{
            hidden: !isExpanded,
          }}
          inputValue={inputValue}
          onInputChange={setInputValue}
          startIcon={<WorkspacesIcon />}
          selectionValue={
            options
              .flatMap((o) => o.options)
              .find((o) => o.value?.id === activeWorkspace.id)?.value
          }
          renderValue={() => (
            <StyledEllipsis isCompact>
              {`${activeWorkspace.company}'s workspace`}
            </StyledEllipsis>
          )}
          options={options}
          onOptionClick={({ selectionValue }) => {
            const workspace = selectionValue as Workspace;
            if (selectionValue && workspace.id) {
              setInputValue('');
              handleWorkspaceChange(workspace);
              setIsExpanded(false);
            }
          }}
        />
      </DropdownFieldNew>
    </Wrapper>
  );
};
