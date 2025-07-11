import {
  Card,
  Ellipsis,
  MD,
  Message,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import styled from 'styled-components';
import { getModuleBySlug } from '../../modules/Factory';

const StyledCard = styled(Card)`
  background-color: transparent;
  padding: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xs};
  &:not(.first-of-type) {
    margin-top: ${({ theme }) => theme.space.xs};
  }
`;

const StyledContainerInner = styled.div`
  min-width: 0;
`;

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 16px 1fr;
  grid-template-rows: 20px;
  align-items: center;
  column-gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.xs};
`;

const NavItemLink = styled(Link)`
  &.isCurrent {
    ${StyledCard} {
      &.no-children {
        background-color: white;
      }
    }
  }
`;

const NavItem = ({
  type,
  children,
}: {
  type: components['schemas']['Module']['type'];
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const { errors } = useAppSelector((state) => state.planModules);
  const Icon = getModuleBySlug(type).useIcon?.();
  const titleType = getModuleBySlug(type)?.useTitle?.();
  const oldSubtitle = getModuleBySlug(type)?.useSubtitle?.() || '';

  const hasErrors =
    (errors &&
      typeof errors === 'object' &&
      Object.keys(errors).some((key) => key.startsWith(type))) ??
    false;

  return (
    <NavItemLink
      to={`module-${type}`}
      containerId="main"
      duration={500}
      offset={-200}
      smooth
      spy
      style={{ textDecoration: 'none' }}
      activeClass="isCurrent"
    >
      <StyledCard
        data-qa="task-item-nav"
        {...(hasErrors && {
          style: {
            borderColor: appTheme.palette.red[900],
          },
        })}
        {...(!children && {
          className: 'no-children',
        })}
      >
        <TitleContainer>
          {Icon}
          <MD isBold color={appTheme.palette.blue[600]}>
            <Ellipsis title={titleType}>{titleType}</Ellipsis>
          </MD>
          {oldSubtitle && (
            <SM style={{ color: appTheme.palette.grey[600] }}>
              <Span>{oldSubtitle}</Span>
            </SM>
          )}
        </TitleContainer>
        <StyledContainerInner>
          {children && children}
          {hasErrors && (
            <div style={{ marginTop: appTheme.space.xs }}>
              <Message validation="error">
                {t('__PLAN_PAGE_NAV_GENERIC_MODULE_ERROR')}
              </Message>
            </div>
          )}
        </StyledContainerInner>
      </StyledCard>
    </NavItemLink>
  );
};

export { NavItem };
