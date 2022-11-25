import {
  theme as globalTheme,
  Title,
  SM,
  Progress,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';

export interface ListItemProps {
  title: string;
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

export const ListItem = ({ item }: { item: ListItemProps }) => (
  <ListItemWrapper>
    <ListItemTitle>
      <Title style={{ color: globalTheme.palette.blue[600] }}>
        {item.title}
      </Title>
      <div>
        <SM tag="span" isBold color={globalTheme.palette.grey[700]}>
          {item.numerator}
        </SM>
        /
        <SM tag="span" color={globalTheme.palette.grey[600]}>
          {item.denominator}
        </SM>
      </div>
    </ListItemTitle>
    <Progress
      value={Math.round((item.numerator / item.denominator) * 100)}
      size="small"
      color="#02807A"
    />
    {/* todo: use theme chart color dark pine */}
  </ListItemWrapper>
);
