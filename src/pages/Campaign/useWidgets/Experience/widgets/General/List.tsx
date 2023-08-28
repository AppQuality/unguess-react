import styled from 'styled-components';

const Li = styled.li``;
const List = styled.ol`
  padding-left: 0;
  list-style: none;
  overflow: hidden;
  counter-reset: numList;

  li {
    position: relative;
    counter-increment: numList;
    margin-bottom: 12px;
    padding-left: 36px;
    color: ${({ theme }) => theme.palette.grey['800']};
  }

  li:before {
    content: counter(numList);

    display: inline-block;
    width: ${({ theme }) => theme.space.base * 6}px;
    height: ${({ theme }) => theme.space.base * 6}px;
    line-height: ${({ theme }) => theme.space.base * 6}px;
    background-color: ${({ theme }) => theme.palette.grey['200']};
    border-radius: 50%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

export const CircleList = List as typeof List & {
  Item: typeof Li;
};

CircleList.Item = Li;
