import { components } from 'src/common/schema';
import styled from 'styled-components';
import { modulesChildrenMap } from './const';

const ChildrenContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.space.sm};
  padding-left: ${({ theme }) => theme.space.sm};
`;

const NavItemChildren = ({
  type,
}: {
  type: components['schemas']['Module']['type'];
}) => {
  if (modulesChildrenMap[`${type}`]) {
    return (
      <ChildrenContainer>{modulesChildrenMap[`${type}`]}</ChildrenContainer>
    );
  }

  return null;
};

export { NavItemChildren };
