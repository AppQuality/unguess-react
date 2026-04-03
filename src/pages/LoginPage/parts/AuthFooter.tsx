import { Anchor, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const AuthFooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.palette.grey[200]};
  padding: ${({ theme }) => `${theme.space.lg} ${theme.space.xl}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.space.sm};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.space.sm};
  }
`;

interface AuthFooterProps {
  showTryberLink?: boolean;
}

export const AuthFooter = ({ showTryberLink }: AuthFooterProps) => {
  const { t } = useTranslation();

  return (
    <AuthFooterWrapper>
      <FooterLinks>
        <Anchor href={t('__AUTH_FOOTER_WEBSITE_URL')}>
          <SM>{t('__AUTH_FOOTER_WEBSITE_LABEL')}</SM>
        </Anchor>
        <Anchor href={t('__AUTH_FOOTER_PRIVACY_URL')}>
          <SM>{t('__AUTH_FOOTER_PRIVACY_LABEL')}</SM>
        </Anchor>
        <Anchor href={t('__AUTH_FOOTER_TOS_URL')}>
          <SM>{t('__AUTH_FOOTER_TOS_LABEL')}</SM>
        </Anchor>
        {showTryberLink && (
          <SM>
            {t('SIGNUP_FORM_BECOME_TESTER_LABEL')}{' '}
            <Anchor isExternal href="https://www.tryber.me" target="_blank">
              {t('SIGNUP_FORM_VISIT_TRYBER_CTA')}
            </Anchor>
          </SM>
        )}
      </FooterLinks>
      <SM>
        {t('__AUTH_FOOTER_NEED_HELP')}{' '}
        <Anchor href="mailto:support@unguess.io">
          {t('__AUTH_FOOTER_SUPPORT_LABEL')}
        </Anchor>
      </SM>
    </AuthFooterWrapper>
  );
};
