import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import styled from 'styled-components';
import { modulesChildrenMap } from './const';

const ChildrenContainer = styled.div`
  margin-top: ${({ theme }) => theme.space.sm};
  max-height: 300px;
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.space.sm};
`;

const NavItemChildren = ({
  module,
}: {
  module: components['schemas']['Module'];
}) => {
  const { type } = module;

  if (modulesChildrenMap[`${type}`]) {
    return (
      <ChildrenContainer>{modulesChildrenMap[`${type}`]}</ChildrenContainer>
    );
  }

  return null;
};

export { NavItemChildren };
