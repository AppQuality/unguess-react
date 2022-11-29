import {
  SM,
  XL,
  XXXL,
  CursorPagination as CP,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ListItem } from './ListItem';
import { ListItemProps, ListProps } from './type';

const ListHeader = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const ListHeaderLabel = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const ListHeaderTitle = styled(XXXL)`
  margin-top: ${({ theme }) => theme.space.xxs};
  margin-bottom: ${({ theme }) => theme.space.xxs};
  color: ${({ theme }) => theme.palette.blue[600]};
`;

const ListColumns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ListBody = styled.div``;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
`;

const ListPagination = styled.div`
  margin-top: auto;
`;

const ListPaginationWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

export const List = ({ columns, items, total, header, title }: ListProps) => {
  const { t } = useTranslation();

  const itemsPerPage = 6;
  const pagesNumber = Math.ceil(items.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [paginatedItems, setPaginatedItems] = useState<ListItemProps[][]>([]);

  useEffect(() => {
    const newPaginatedItems = [];
    const currentItems = [...items];
    while (currentItems.length) {
      newPaginatedItems.push(currentItems.splice(0, itemsPerPage));
    }
    setPaginatedItems(newPaginatedItems);
  }, [items]);

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    /* List */

    <ListWrapper>
      <ListHeader>
        <ListHeaderLabel isBold>{header}</ListHeaderLabel>
        <ListHeaderTitle isBold>
          <XXXL tag="span" isBold>
            {total}
          </XXXL>{' '}
          <XL tag="span" isBold>
            {title}
          </XL>{' '}
        </ListHeaderTitle>
        <ListColumns>
          {columns.map((column) => (
            <ListHeaderLabel isBold>{column}</ListHeaderLabel>
          ))}
        </ListColumns>
      </ListHeader>

      <ListBody>
        {paginatedItems &&
          paginatedItems[`${currentPage}`] &&
          paginatedItems[`${currentPage}`].map((item) => (
            <ListItem numerator={item.numerator} denominator={item.denominator}>
              {item.children}
            </ListItem>
          ))}
      </ListBody>

      <ListPagination>
        <ListPaginationWrapper>
          <CP aria-label="Cursor pagination" style={{ justifyContent: 'end' }}>
            <CP.Previous onClick={onPrevious} disabled={currentPage <= 0}>
              {t('__LIST_PAGE_PREVIOUS')}
            </CP.Previous>
            <CP.Next onClick={onNext} disabled={currentPage >= pagesNumber - 1}>
              {t('__LIST_PAGE_NEXT')}
            </CP.Next>
          </CP>
        </ListPaginationWrapper>
      </ListPagination>
    </ListWrapper>
  );
};
