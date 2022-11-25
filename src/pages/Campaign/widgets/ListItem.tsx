import {
  theme as globalTheme,
  Title,
  SM,
  Progress,
  CHARTS_COLOR_PALETTE,
} from '@appquality/unguess-design-system';
import { ReactNode } from 'react';
import styled from 'styled-components';

export interface ListItemProps {
  children: ReactNode;
  numerator: number;
  denominator: number;
}

const ListItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ListItemWrapper = styled.div`
  margin-top: ${(p) => p.theme.space.xxs};
`;

export const ListItem = ({
  children,
  numerator,
  denominator,
}: ListItemProps) => (
  <ListItemWrapper>
    <ListItemTitle>
      <Title style={{ color: globalTheme.palette.blue[600] }}>{children}</Title>
      <div>
        <SM tag="span" isBold color={globalTheme.palette.grey[700]}>
          {numerator}
        </SM>
        /
        <SM tag="span" color={globalTheme.palette.grey[600]}>
          {denominator}
        </SM>
      </div>
    </ListItemTitle>
    <Progress
      value={Math.round((numerator / denominator) * 100)}
      size="small"
      color={CHARTS_COLOR_PALETTE.darkPine}
    />
  </ListItemWrapper>
);
