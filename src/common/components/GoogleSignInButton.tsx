import { Button } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google-g.svg';
import { useAuth } from 'src/features/auth/context';
import styled from 'styled-components';

const OrDividerRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.palette.grey[300]};
  }
`;

export const AuthOrDivider = () => {
  const { t } = useTranslation();
  return <OrDividerRow>{t('__AUTH_OR_DIVIDER')}</OrDividerRow>;
};

export const GoogleSignInButton = () => {
  const { t } = useTranslation();
  const { loginWithGoogle } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = async () => {
    setIsRedirecting(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      setIsRedirecting(false);
    }
  };

  return (
    <Button
      type="button"
      isPill
      isStretched
      disabled={isRedirecting}
      onClick={handleClick}
      data-qa="continue-with-google"
    >
      <Button.StartIcon>
        <GoogleIcon />
      </Button.StartIcon>
      {t('__CONTINUE_WITH_GOOGLE')}
    </Button>
  );
};
