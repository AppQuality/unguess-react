import { Header as UgHeader } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { Changelog } from './changelog';
import { BrandLogo } from './brandLogo';
import { ProfileAvatar } from './profileAvatar';

export const Header = () => (
  <UgHeader isStandalone style={{ zIndex: theme.levels.front }}>
    <BrandLogo />
    <Changelog />
    <ProfileAvatar />
  </UgHeader>
);
