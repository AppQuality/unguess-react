import {
  SM,
  theme as globalTheme,
  XL,
  XXXL,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { ListItem } from './ListItem';
import { WidgetCard } from '../WidgetCard';
import { ListProps } from './type';

const ListHeader = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const ListTitle = styled(XXXL)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
`;

const Items = styled.div``;

const ListWrapper = styled.div`
  margin-top: ${(p) => p.theme.space.xxs};
`;

export const List = ({ items, total }: ListProps) => (
  <WidgetCard>
    <WidgetCard.Header tooltipContent="...incoming">
      Flip card title
    </WidgetCard.Header>
    <WidgetCard.Description
      header=""
      content={
        /* List */

        <ListWrapper>
          <ListHeader>Totale</ListHeader>
          <ListTitle isBold style={{ color: globalTheme.palette.blue[600] }}>
            <XXXL tag="span">{total}</XXXL> <XL tag="span">bug unici</XL>{' '}
          </ListTitle>

          <Items>
            {items.map((item) => (
              <ListItem
                numerator={item.numerator}
                denominator={item.denominator}
              >
                {item.children}
              </ListItem>
            ))}
          </Items>
        </ListWrapper>
      }
      footer=""
    />
  </WidgetCard>
);
