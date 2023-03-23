import React, { ReactChild } from 'react'
import styled from 'styled-components';

const ItemGroupWrapper = styled.div`
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const TitleSpan = styled.span`
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.sm}`};
  font-weight:  ${({ theme }) => theme.fontWeights.semibold};
`;

const ItemGroup = ({
    title,
    children
}: {
    title: string | undefined;
    children: ReactChild | ReactChild[]
}) => (
    <ItemGroupWrapper>
        <TitleSpan>{title || ''}</TitleSpan>
        {children}
    </ItemGroupWrapper>
)

export default ItemGroup;