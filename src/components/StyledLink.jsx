import React from 'react';
import styled from 'styled-components';

export default function StyledLink(props) {

  const Link = styled.div`
    color: ${props => props.theme.colors.primary.blue};
    font-size: ${props => props.theme.fontSizes[5]};
    margin-top: ${props => props.theme.space[4]}; 
    cursor: pointer;
  `;

  return (
    <Link {...props}>{props.children}</Link>
  )
}
