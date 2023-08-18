import { Header as UgHeader } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { WorkspacesDropdown } from '../workspacesDropdown';
import { MobileToggle } from './MobileToggle';
import { BrandLogo } from './brandLogo';
import { Changelog } from './changelog';
import { ProfileAvatar } from './profileAvatar';

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
    {loggedIn && <WorkspacesDropdown />}
    <div style={{ order: '1', display: 'flex' }}>
      <Changelog />
      {loggedIn && <ProfileAvatar />}
    </div>
  </UgHeader>
);
