import {
  HeaderItem,
  HeaderItemIcon,
  Logo,
} from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoFull } from 'src/assets/icons/logo.svg';
import styled from 'styled-components';

const LogoIconContainer = styled(HeaderItem)`
  margin-right: 2px;
  border-right: none;
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
    position: absolute;
  }
`;

const LogoFullComponent = styled(LogoFull)`
  cursor: pointer;
  height: 32px;
`;

export const BrandLogo = ({
  size,
  redirect = '/',
}: {
  size: 'simple' | 'full';
  redirect?: string;
}) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(redirect);
  };

  if (size === 'full') return <LogoFullComponent onClick={handleLogoClick} />;
  return (
    <LogoIconContainer hasLogo>
      <HeaderItemIcon onClick={handleLogoClick}>
        <Logo type="icon" size={150} />
      </HeaderItemIcon>
    </LogoIconContainer>
  );
};
