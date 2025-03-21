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
import { useValidationContext } from 'src/features/modules/FormProvider';
import styled from 'styled-components';
import { getIconFromModule, getTitleFromModuleType } from '../../utils';

const StyledCard = styled(Card)`
  padding: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xs};
  background-color: transparent;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
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
  module,
  index,
  children,
}: {
  module: components['schemas']['Module'];
  index: number;
  children?: React.ReactNode;
}) => {
  const { type } = module;
  const { t } = useTranslation();
  const { errors } = useValidationContext();

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
            borderColor: appTheme.palette.red[600],
          },
        })}
        {...(!children && {
          className: 'no-children',
        })}
      >
        <StyledContainer>
          {getIconFromModule(module)}
          <Ellipsis style={{ width: '95%' }}>
            <MD>
              {index + 1}.{' '}
              <Span isBold>{getTitleFromModuleType(module.type)}</Span>
            </MD>
          </Ellipsis>
        </StyledContainer>
        {children && children}
        {hasErrors && (
          <Message validation="error" style={{ marginTop: appTheme.space.sm }}>
            {t('__PLAN_PAGE_NAV_GENERIC_MODULE_ERROR')}
          </Message>
        )}
      </StyledCard>
    </NavItemLink>
  );
};

export { NavItem };
