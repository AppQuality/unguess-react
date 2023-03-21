import React, { ReactChild } from 'react'
import styled from 'styled-components';

const ItemGroupWrapper = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const TitleSpan = styled.span`
  padding: 1.25em 0.9em;
  font-weight: 500
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