import {
  SM,
  theme as globalTheme,
  XL,
  XXXL,
  CursorPagination as CP,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ListItem } from './ListItem';
import { ListItemProps, ListProps } from './type';

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
const PaginationWrapper = styled.div`
  margin-top: ${(p) => p.theme.space.xxs};
`;

export const List = ({ items, total, header, title }: ListProps) => {
  const { t } = useTranslation();

  const itemsPerPage = 5;
  const pagesNumber = Math.ceil(items.length / itemsPerPage);
  const [cursor, setCursor] = useState(0);
  const [paginatedItems, setPaginatedItems] = useState<ListItemProps[][]>([]);
  useEffect(() => {
    let i = 0;
    const newPaginatedItems = [];
    const currentItems = [...items];
    while (currentItems.length) {
      newPaginatedItems.push(currentItems.splice(0, itemsPerPage));
      i += 1;
    }
    setPaginatedItems(newPaginatedItems);
  }, [items, itemsPerPage]);

  const onPrevious = () => {
    setCursor(cursor - 1);
  };
  const onNext = () => {
    setCursor(cursor + 1);
  };

  return (
    /* List */

    <ListWrapper>
      <ListHeader>{header}</ListHeader>
      <ListTitle isBold style={{ color: globalTheme.palette.blue[600] }}>
        <XXXL tag="span">{total}</XXXL> <XL tag="span">{title}</XL>{' '}
      </ListTitle>

      <Items>
        {paginatedItems &&
          paginatedItems[cursor] &&
          paginatedItems[cursor].map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem
              numerator={item.numerator}
              denominator={item.denominator}
              key={index}
            >
              {item.children}
            </ListItem>
          ))}
      </Items>
      <PaginationWrapper>
        <CP aria-label="Cursor pagination" style={{ justifyContent: 'end' }}>
          <CP.Previous onClick={onPrevious} disabled={cursor <= 0}>
            {t('__LIST_PAGE_PREVIOUS')}
          </CP.Previous>
          <CP.Next onClick={onNext} disabled={cursor >= pagesNumber - 1}>
            {t('__LIST_PAGE_NEXT')}
          </CP.Next>
        </CP>
      </PaginationWrapper>
    </ListWrapper>
  );
};
