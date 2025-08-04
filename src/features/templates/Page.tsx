import React, { useEffect } from 'react';
import { Track } from 'src/common/Track';
import { useNavigate } from 'react-router-dom';
import i18n from 'src/i18n';
import { Logged } from './Logged';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import { Container } from './Container';
import { usePathWithoutLocale } from '../navigation/usePathWithoutLocale';

export const Page = ({
  children,
  title = 'UNGUESS - BE SMART FROM THE START',
  pageHeader,
  route,
  excludeMarginTop,
  excludeMarginBottom,
  className,
  isMinimal,
}: {
  children: React.ReactNode;
  title?: string;
  pageHeader?: React.ReactNode;
  route: string;
  excludeMarginTop?: boolean;
  excludeMarginBottom?: boolean;
  className?: string;
  isMinimal?: boolean;
}) => {
  // remove the following lines (30-40) to manage the correct language routing - i18n routes translation profilemodal language
  const { language } = i18n;
  const navigate = useNavigate();
  const pathWithoutLocale = usePathWithoutLocale();
  const path = pathWithoutLocale ? `${pathWithoutLocale}` : '/';

  useEffect(() => {
    if (language !== 'en') {
      i18n.changeLanguage('en');
      navigate(path, { replace: true });
    }
  }, [language]);

  return (
    <Track title={title}>
      <ErrorBoundary>
        <Logged route={route} pageHeader={pageHeader} isMinimal={isMinimal}>
          <Container
            id="container"
            className={className}
            excludeMarginTop={excludeMarginTop}
            excludeMarginBottom={excludeMarginBottom}
          >
            {children}
          </Container>
        </Logged>
      </ErrorBoundary>
    </Track>
  );
};
