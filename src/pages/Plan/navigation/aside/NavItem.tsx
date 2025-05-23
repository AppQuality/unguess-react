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
import { getIconFromModuleType, getTitleFromModuleType } from '../../utils';
import { getSubtitleFromModuleType } from '../../utils/getSubtitleFromModuleType';

const StyledCard = styled(Card)`
  background-color: transparent;
  padding: 0;
  margin-top: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: ${({ theme }) => theme.space.sm};
  gap: ${({ theme }) => theme.space.sm};
`;

const StyledContainerOuter = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${({ theme }) => theme.space.md};
  padding-right: ${({ theme }) => theme.space.md};
  padding-top: ${({ theme }) => theme.space.sm};
  padding-bottom: ${({ theme }) => theme.space.sm};
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
        <StyledContainerOuter>
          <div
            className="module-icon"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {getIconFromModuleType(type)}
          </div>
          <StyledContainerInner
            style={{ marginBottom: children ? appTheme.space.xxs : 0 }}
          >
            <Ellipsis style={{ width: '95%' }}>
              <MD color={appTheme.palette.blue[600]}>
                <Span isBold>{getTitleFromModuleType(type)}</Span>
              </MD>
              <SM style={{ color: appTheme.palette.grey[600] }}>
                <Span>{getSubtitleFromModuleType(type)}</Span>
              </SM>
            </Ellipsis>
            {children && children}
            {hasErrors && (
              <Message validation="error">
                {t('__PLAN_PAGE_NAV_GENERIC_MODULE_ERROR')}
              </Message>
            )}
          </StyledContainerInner>
        </StyledContainerOuter>
      </StyledCard>
    </NavItemLink>
  );
};

export { NavItem };
