import {
  Card,
  Ellipsis,
  MD,
  Message,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import styled from 'styled-components';
import { useModuleTouchpoints } from '../../hooks';
import { getIconFromTouchpointOutput } from '../../utils';

const StyledCard = styled(Card)`
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  margin: ${({ theme }) => theme.space.xs} 0;
  background-color: transparent;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const TouchpointItemNavLink = styled(Link)`
  &.isCurrent {
    ${StyledCard} {
      background-color: white;
    }
  }
`;

const ModuleIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2px;
`;

const TouchpointItemNav = ({
  touchpoint,
}: {
  touchpoint: components['schemas']['OutputModuleTouchpoints'] & {
    key: number;
  };
}) => {
  const { t } = useTranslation();
  const { error } = useModuleTouchpoints();
  const { key, kind, form_factor } = touchpoint;

  const hasErrors =
    (error &&
      typeof error === 'object' &&
      Object.keys(error).some((k) => k.startsWith(`touchpoints.${key}`))) ??
    false;

  return (
    <TouchpointItemNavLink
      to={`touchpoint-${key + 1}`}
      containerId="main"
      duration={500}
      offset={-200}
      smooth
      spy
      isDynamic
      style={{ textDecoration: 'none' }}
      activeClass="isCurrent"
    >
      <StyledCard
        key={key}
        data-qa="touchpoint-item-nav"
        {...(hasErrors && {
          style: {
            borderColor: appTheme.palette.red[900],
          },
        })}
      >
        <StyledContainer>
          <ModuleIconContainer>
            {getIconFromTouchpointOutput(touchpoint)}
          </ModuleIconContainer>
          <MD color={appTheme.palette.blue[600]} style={{ minWidth: 0 }}>
            <Ellipsis title={`${form_factor} ${kind}`}>
              {key + 1}.{' '}
              <Span isBold>
                {form_factor} {kind}
              </Span>
            </Ellipsis>
          </MD>
        </StyledContainer>
        {hasErrors && (
          <Message validation="error" style={{ marginTop: appTheme.space.sm }}>
            {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_GENERIC_TOUCHPOINT_ERROR')}
          </Message>
        )}
      </StyledCard>
    </TouchpointItemNavLink>
  );
};

export { TouchpointItemNav };
