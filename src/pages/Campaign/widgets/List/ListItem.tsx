import { SM, Progress, MD, Span } from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';
import styled from 'styled-components';
import { ListItemProps } from './type';

const ListItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.space.xs};
  padding-bottom: ${({ theme }) => theme.space.xxs};
`;

const ListItemWrapper = styled.div`
  margin-bottom: ${(p) => p.theme.space.xxs};
`;

export const ListItem = ({
  children,
  numerator,
  denominator,
}: ListItemProps) => (
  <ListItemWrapper>
    <ListItemTitle>
      <MD isBold style={{ color: globalTheme.palette.blue[600] }}>
        {children}
      </MD>
      <SM style={{ color: globalTheme.palette.grey[600] }}>
        <Span isBold style={{ color: globalTheme.palette.grey[700] }}>
          {numerator}
        </Span>
        /{denominator}
      </SM>
    </ListItemTitle>
    <Progress
      value={Math.round((numerator / denominator) * 100)}
      size="small"
      color={globalTheme.colors.darkPine}
      style={{ margin: 0, marginTop: globalTheme.space.xxs }}
    />
  </ListItemWrapper>
);
