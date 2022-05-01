import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.button`
    border: 0;
    height: 48px;
    width: 48px;
    border-radius: ${props => props.theme.radii[3]};
    cursor: pointer;
    background-color: ${props => props.theme.colors.secondary.darkGrey};
    margin-bottom: ${props => props.theme.space[4]};
`;

export default function IconButton(props) {
  return (
    <ButtonWrapper {...props}>{props.children}</ButtonWrapper>
  )
}
