import {
  Span,
  theme as globalTheme,
  Title,
  SM,
  Progress,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';

const ListItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ListItemWrapper = styled.div`
  margin-top: ${(p) => p.theme.space.xxs};
`;

export const ListItem = ({
  item,
}: {
  item: { usecase: string; unique: number; total: number };
}) => (
  <ListItemWrapper>
    <ListItemTitle>
      <Title style={{ color: globalTheme.palette.blue[600] }}>
        {item.usecase}
      </Title>
      <div>
        <SM tag="span" isBold color={globalTheme.palette.grey[700]}>
          {item.unique}
        </SM>
        /
        <SM tag="span" color={globalTheme.palette.grey[600]}>
          {item.total}
        </SM>
      </div>
    </ListItemTitle>
    <Progress
      value={Math.round((item.unique / item.total) * 100)}
      size="small"
      color="#02807A"
    />
    {/* todo: use theme chart color dark pine */}
  </ListItemWrapper>
);
