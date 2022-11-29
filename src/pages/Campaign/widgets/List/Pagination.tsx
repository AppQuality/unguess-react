import styled from 'styled-components';
import { CursorPagination } from '@appquality/unguess-design-system';

import { useTranslation } from 'react-i18next';

const ListPagination = styled.div`
  margin-top: auto;
`;

const ListPaginationWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const Pagination = ({
  setPage,
  page,
  totalPages,
}: {
  setPage: (value: number) => void;
  page: number;
  totalPages: number;
}) => {
  const { t } = useTranslation();
  return (
    <ListPagination>
      <ListPaginationWrapper>
        <CursorPagination
          aria-label="Cursor pagination"
          style={{ justifyContent: 'end' }}
        >
          <CursorPagination.Previous
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1}
          >
            {t('__LIST_PAGE_PREVIOUS')}
          </CursorPagination.Previous>
          <CursorPagination.Next
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={page === totalPages}
          >
            {t('__LIST_PAGE_NEXT')}
          </CursorPagination.Next>
        </CursorPagination>
      </ListPaginationWrapper>
    </ListPagination>
  );
};

export { Pagination };
