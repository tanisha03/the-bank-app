import React from 'react'
import emptyStatePlaceHolder from '../assets/images/emptyState.png';
import styled from 'styled-components';

export default function EmptyState() {

  const EmptyStateWrapper = styled.div`
      div {
          text-align: center;
          font-size: ${props => props.theme.fontSizes[6]}
      }
  `;

  return (
    <EmptyStateWrapper>
        <img src={emptyStatePlaceHolder} alt="" />
        <div>No results, search for the perfect match </div>
    </EmptyStateWrapper>
  )
}
