import { Header as UgHeader } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { Changelog } from './changelog';
import { BrandLogo } from './brandLogo';
import { ProfileAvatar } from './profileAvatar';

export const Header = () => (
  <UgHeader isStandalone style={{ zIndex: appTheme.levels.front }}>
    <BrandLogo />
    <Changelog />
    <ProfileAvatar />
  </UgHeader>
);
