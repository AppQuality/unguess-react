import { Header as UgHeader } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { Changelog } from './changelog';
import { BrandLogo } from './brandLogo';
import { ProfileAvatar } from './profileAvatar';
import { PermissionSettings } from './settings/permissionSettings';

export const Header = () => (
  <UgHeader isStandalone style={{ zIndex: theme.levels.front }}>
    <BrandLogo />
    <PermissionSettings />
    <Changelog />
    <ProfileAvatar />
  </UgHeader>
);
