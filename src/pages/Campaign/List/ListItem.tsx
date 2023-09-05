import {
  Progress,
  MD,
  Span,
  Ellipsis,
  TextLabel,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
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
        style={{ color: appTheme.palette.blue[600], display: 'contents' }}
      >
        <Ellipsis style={{ width: '97%' }}>{children}</Ellipsis>
      </MD>

      <TextLabel style={{ justifySelf: 'end' }}>
        <Span isBold style={{ color: appTheme.palette.grey[700] }}>
          {numerator}
        </Span>
        /{denominator}
      </TextLabel>
    </ListItemTitle>
    <Progress
      value={Math.round((numerator / denominator) * 100)}
      size="small"
      color={appTheme.palette.green[600]}
      style={{ margin: 0, marginTop: appTheme.space.xxs }}
    />
  </ListItemWrapper>
);
