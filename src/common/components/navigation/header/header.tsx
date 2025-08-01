import {
  HeaderItem,
  Header as UgHeader,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { WorkspacesDropdown } from '../workspacesDropdown';
import { PermissionItem } from '../workspacesDropdown/PermissionItem';
import { MobileToggle } from './MobileToggle';
import { BrandLogo } from './brandLogo';
import { Changelog } from './changelog';
import { ProfileAvatar } from './profileAvatar';

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
      {loggedIn && (
        <ProfileAvatar data-qa="global_header_navItem_profile_avatar" />
      )}
    </div>
  </UgHeader>
);
