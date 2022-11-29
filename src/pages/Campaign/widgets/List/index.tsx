import { XXXL } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { ListProps } from './type';
import { Pagination } from './Pagination';
import { Columns } from './Columns';

const ListHeader = styled.div`
  margin-top: ${({ theme }) => theme.space.base * 6}px;
`;

const ListHeaderTitle = styled(XXXL)`
  margin-top: ${({ theme }) => theme.space.xxs};
  margin-bottom: ${({ theme }) => theme.space.xxs};
  color: ${({ theme }) => theme.palette.blue[600]};
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
`;

/**
 * 
 * @example 
 * 
 * ```
const ExampleList = () => {
  const items = [...]
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState(items);

  const pageSize = 6;

  const maxPages = Math.ceil(items.length / pageSize);

  useEffect(() => {
    setPaginatedItems(
      items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  }, [currentPage]);

  return (
      <List
        header="header"
        title={<>My title</>}
      >
        <List.Columns>
          <List.Columns.Label isBold>Use Case</List.Columns.Label>
          <List.Columns.Label isBold>Bug su Tot.</List.Columns.Label>
        </List.Columns>
        {paginatedItems.map((item) => (
          <ListItem
            key={item.id}
            numerator={item.numerator}
            denominator={item.denominator}
          >
            {item.children}
          </ListItem>
        ))}
        <List.Pagination
          setPage={setCurrentPage}
          page={currentPage}
          totalPages={maxPages}
        />
      </List>
  );
};
```
 * 
 */
export const List = ({ header, title, children }: ListProps) => (
  <ListWrapper>
    <ListHeader>
      {header ? <Columns.Label isBold>{header}</Columns.Label> : null}
      <ListHeaderTitle isBold>{title}</ListHeaderTitle>
    </ListHeader>

    {children}
  </ListWrapper>
);

List.Pagination = Pagination;
List.Columns = Columns;
