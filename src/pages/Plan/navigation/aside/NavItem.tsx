import { Card, Ellipsis, MD, Span } from '@appquality/unguess-design-system';
import { Link } from 'react-scroll';
import { components } from 'src/common/schema';
import styled from 'styled-components';
import { getIconFromModule, getTitleFromModule } from '../../utils';

const StyledCard = styled(Card)`
  padding: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const NavItem = ({
  module,
  index,
}: {
  module: components['schemas']['Module'];
  index: number;
}) => {
  const { type } = module;

  // TODO: implement error handling

  return (
    <Link
      to={`module-${type}`}
      containerId="main"
      duration={500}
      offset={-20}
      smooth
      spy
      style={{ textDecoration: 'none' }}
    >
      <StyledCard data-qa="task-item-nav">
        <StyledContainer>
          {getIconFromModule(module)}
          <Ellipsis style={{ width: '95%' }}>
            <MD>
              {index + 1}.<Span isBold>{getTitleFromModule(module)}</Span>
            </MD>
          </Ellipsis>
        </StyledContainer>
      </StyledCard>
    </Link>
  );
};

export { NavItem };
