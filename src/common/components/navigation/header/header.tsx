import {
  Header as UgHeader,
  HeaderItem,
} from '@appquality/unguess-design-system';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { WorkspacesDropdown } from '../workspacesDropdown';
import { MobileToggle } from './MobileToggle';
import { BrandLogo } from './brandLogo';
import { Changelog } from './changelog';
import { ProfileAvatar } from './profileAvatar';
import { PermissionItem } from '../workspacesDropdown/PermissionItem';

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

export const Header = ({
  logo = 'simple',
  loggedIn = true,
  style,
}: {
  logo?: 'simple' | 'full';
  loggedIn?: boolean;
  style?: React.CSSProperties;
}) => (
  <UgHeader
    isStandalone
    style={{
      zIndex: appTheme.levels.front,
      justifyContent: 'space-between',
      ...style,
    }}
  >
    {loggedIn && <MobileToggle />}
    <BrandLogo size={logo} />
    {loggedIn && (
      <DropdownItem>
        <WorkspacesDropdown />
        <PermissionItem />
      </DropdownItem>
    )}
    <div style={{ order: '1', display: 'flex' }}>
      <Changelog />
      {loggedIn && <ProfileAvatar />}
    </div>
  </UgHeader>
);
