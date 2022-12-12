import {
  SM,
  Progress,
  MD,
  Span,
  Ellipsis,
} from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';
import styled from 'styled-components';
import { ListItemProps } from './type';

const ListItemTitle = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  padding-top: ${({ theme }) => theme.space.xs};
  padding-bottom: ${({ theme }) => theme.space.xxs};
`;

const ListItemWrapper = styled.div`
  margin-top: ${(p) => p.theme.space.xxs};
  display: block;
`;

export const ListItem = ({
  children,
  numerator,
  denominator,
}: ListItemProps) => (
  <ListItemWrapper>
    <ListItemTitle>
      <MD
        isBold
        style={{ color: globalTheme.palette.blue[600], display: 'contents' }}
      >
        <Ellipsis style={{ width: '97%' }}>{children}</Ellipsis>
      </MD>

      <SM style={{ color: globalTheme.palette.grey[600], justifySelf: 'end' }}>
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
