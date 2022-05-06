import React from 'react'
import styled from 'styled-components';

const StyledInput = styled.input`
    min-width: 360px;
    border:2px solid #aaa;
    border-radius: ${props => props.theme.radii[2]};
    margin: ${props => props.theme.space[2]};
    outline:none;
    padding: ${props => props.theme.space[3]};
    box-sizing:border-box;
    transition:.3s;
    font-size: ${props => props.theme.fontSizes[4]};
    &:hover {
        border-color: #4A83EE;
        box-shadow:0 0 8px 0 #4A83EE;
    }
`;


export default function Input(props) {
  return (
    <StyledInput {...props} />
  )
}
