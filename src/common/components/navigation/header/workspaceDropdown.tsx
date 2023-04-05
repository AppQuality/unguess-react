import {
  Dropdown,
  Ellipsis,
  HeaderItem,
  HeaderItemText,
  Item,
  MD,
  Menu,
  MenuHeaderItem,
  Select,
  Separator,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { theme as appTheme } from 'src/app/theme';
import { Workspace } from 'src/features/api';
import styled from 'styled-components';
import { saveWorkspaceToLs } from 'src/features/navigation/cachedStorage';
import API from 'src/common/api';
import { setWorkspace } from 'src/features/navigation/navigationSlice';
import TagManager from 'react-gtm-module';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useNavigate } from 'react-router-dom';
import { selectWorkspaces } from 'src/features/workspaces/selectors';
import { useTranslation } from 'react-i18next';

const StyledEllipsis = styled(Ellipsis)<{ isCompact?: boolean }>`
  ${({ theme, isCompact }) =>
    isCompact &&
    `
    width: ${theme.components.chrome.nav.workspaceDropdownWidth}px; 
  `}
  text-align: start;
`;

const DropdownItem = styled(HeaderItem)`
  margin-right: auto;
  margin-left: -8px;
  color: ${({ theme }) => theme.colors.primaryHue};
  font-family: ${({ theme }) => theme.fonts.system};
  z-index: 2;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const BrandName = styled(HeaderItem)`
  margin-right: auto;
  margin-left: -8px;
  color: ${({ theme }) => theme.colors.primaryHue};
  pointer-events: none;
  font-family: ${({ theme }) => theme.fonts.system};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const WorkspacesDropdown = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { userData: user } = useAppSelector((state) => state.user);
  const workspaces = useAppSelector(selectWorkspaces);

  const navigate = useNavigate();

  const homeRoute = useLocalizeRoute('');

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
        selectedItem={activeWorkspace}
        onSelect={handleWorkspaceChange}
        downshiftProps={{
          itemToString: (item: Workspace) => item && item.company,
        }}
      >
        <Field>
          <Select style={{ color: appTheme.colors.primaryHue }}>
            <StyledEllipsis isCompact>
              {`${activeWorkspace.company}'s workspace`}
            </StyledEllipsis>
          </Select>
        </Field>
        <Menu>
          <MenuHeaderItem>
            <MD isBold style={{ color: appTheme.palette.grey[800] }}>
              {t('__APP_MOBILE_NAVIGATION_WORKSPACES_DROPDOWN_LABEL')}
            </MD>
          </MenuHeaderItem>
          <Separator />
          {workspaces &&
            workspaces.map((item) => <Item value={item}>{item.company}</Item>)}
        </Menu>
      </Dropdown>
    </DropdownItem>
  ) : (
    <BrandName>
      <HeaderItemText>{`${activeWorkspace?.company}'s Workspace`}</HeaderItemText>
    </BrandName>
  );
};
