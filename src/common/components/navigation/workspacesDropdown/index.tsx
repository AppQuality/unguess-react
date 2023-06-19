import {
  Autocomplete,
  Dropdown,
  Ellipsis,
  HeaderItem,
  HeaderItemText,
  Item,
  ItemContent,
  Menu,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useEffect, useState } from 'react';
import { Workspace } from 'src/features/api';
import styled from 'styled-components';
import { saveWorkspaceToLs } from 'src/features/navigation/cachedStorage';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';
import { ReactComponent as WorkspacesIcon } from 'src/common/components/navigation/sidebar/icons/campaigns.svg';
import API from 'src/common/api';
import { setWorkspace } from 'src/features/navigation/navigationSlice';
import TagManager from 'react-gtm-module';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import useDebounce from 'src/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { selectWorkspaces } from 'src/features/workspaces/selectors';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { WorkspaceSettings } from '../../inviteUsers/workspaceSettings';

const StyledEllipsis = styled(Ellipsis)<{ isCompact?: boolean }>`
  ${({ theme, isCompact }) =>
    isCompact &&
    `
      width: ${theme.components.chrome.nav.workspaceDropdownWidth}px; 
    `}
  text-align: start;
  ${(props) => retrieveComponentStyles('text.primary', props)};
`;

const StyledItem = styled(Item)`
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};

  &:first-child {
    margin-top: 0;
  }
`;

const GroupLabel = styled(StyledItem)`
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
  text-transform: uppercase;

  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:not(:first-child) {
    margin-top: ${({ theme }) => theme.space.sm};
  }
`;

const DropdownItem = styled(HeaderItem)`
  margin-right: auto;
  margin-left: -8px;
  ${(props) => retrieveComponentStyles('text.primary', props)};
  font-family: ${({ theme }) => theme.fonts.system};
  z-index: 2;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const homeRoute = useLocalizeRoute('');

  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { userData: user } = useAppSelector((state) => state.user);
  const workspaces = useAppSelector(selectWorkspaces);

  const [selectedItem, setSelectedItem] = useState<Workspace>();
  const [inputValue, setInputValue] = useState<string>('');
  const [matchingPersonal, setMatchingPersonal] = useState(workspaces);
  const [matchingShared, setMatchingShared] = useState(workspaces);
  const [canManageUsers, setCanManageUsers] = useState(false);

  const debouncedInputValue = useDebounce<string>(inputValue, 300);

  const filterMatchingOptions = (value: string) => {
    const matchedOptions = workspaces.filter(
      (ws: Workspace) =>
        ws.company.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !==
        -1
    );

    // Group workspaces by isShared property (true | false)
    const sharedWorkspaces = matchedOptions.filter((ws) => ws.isShared);
    const personalWorkspaces = matchedOptions.filter((ws) => !ws.isShared);

    setMatchingPersonal(personalWorkspaces);
    setMatchingShared(sharedWorkspaces);

    // Check if current active workspace is in personal or shared workspaces
    const activeWorkspaceInPersonal = !!personalWorkspaces.find(
      (ws) => ws.id === activeWorkspace?.id
    );

    setCanManageUsers(activeWorkspaceInPersonal);
  };

  useEffect(() => {
    filterMatchingOptions(debouncedInputValue);
  }, [debouncedInputValue, activeWorkspace, workspaces]);

  const toggleGtmWorkspaceChange = (workspaceName: string) => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'workspace_change',
        role: user.role,
        wp_user_id: user.tryber_wp_user_id,
        tester_id: user.id,
        name: user.name,
        email: user.email,
        company: workspaceName,
      },
    });
  };

  const handleWorkspaceChange = (workspace: Workspace) => {
    if (workspace.id !== activeWorkspace?.id) {
      saveWorkspaceToLs(workspace);
      API.workspacesById(workspace.id).then((ws) => {
        dispatch(setWorkspace(ws));
        toggleGtmWorkspaceChange(ws.company);
        navigate(homeRoute, { replace: true });
      });
    }
  };

  if (!activeWorkspace || !user) return null;

  return workspaces.length > 1 ? (
    <DropdownItem>
      <Dropdown
        inputValue={inputValue}
        selectedItem={selectedItem}
        onSelect={(item: Workspace) => {
          if (item && item.id) {
            setSelectedItem(item);
            setInputValue('');
            handleWorkspaceChange(item);
          }
        }}
        onInputValueChange={(value) => {
          setInputValue(value);
        }}
        downshiftProps={{
          itemToString: (item: Workspace) => item && item.company,
        }}
      >
        <Field>
          <Autocomplete start={<WorkspacesIcon />}>
            <StyledEllipsis isCompact>
              {`${activeWorkspace.company}'s workspace`}
            </StyledEllipsis>
          </Autocomplete>
        </Field>
        <Menu>
          {matchingPersonal.length > 0 && (
            <>
              <GroupLabel disabled>
                {t(
                  '__APP_MOBILE_NAVIGATION_PERSONAL_WORKSPACES_DROPDOWN_GROUP_LABEL'
                )}
              </GroupLabel>
              {matchingPersonal.map((item) => (
                <StyledItem key={`workspace_${item.id}`} value={item}>
                  <ItemContent label={item.company} />
                </StyledItem>
              ))}
            </>
          )}

          {matchingShared.length > 0 && (
            <>
              <GroupLabel disabled>
                {t(
                  '__APP_MOBILE_NAVIGATION_SHARED_WORKSPACES_DROPDOWN_GROUP_LABEL'
                )}
              </GroupLabel>
              {matchingShared.map((item) => (
                <StyledItem key={`workspace_${item.id}`} value={item}>
                  <ItemContent
                    // description={`${item.sharedItems} shared items`}
                    description={t(
                      '__APP_MOBILE_NAVIGATION_SHARED_WORKSPACES_COUNTER_LABEL',
                      { count: item.sharedItems || 0 }
                    )}
                    label={item.company}
                  />
                </StyledItem>
              ))}
            </>
          )}

          {!matchingPersonal.length && !matchingShared.length && (
            <StyledItem disabled>
              <span>
                {t(
                  '__APP_MOBILE_NAVIGATION_WORKSPACES_DROPDOWN_LABEL_NO_MATCHING_ITEMS'
                )}
              </span>
            </StyledItem>
          )}
        </Menu>
      </Dropdown>
      {canManageUsers && (
        <div style={{ marginLeft: appTheme.space.sm }}>
          <WorkspaceSettings />
        </div>
      )}
    </DropdownItem>
  ) : (
    <>
      <BrandName>{`${activeWorkspace?.company}'s Workspace`}</BrandName>
      {canManageUsers && (
        <DropdownItem>
          <WorkspaceSettings />
        </DropdownItem>
      )}
    </>
  );
};
