import React from 'react'
import styled, {keyframes} from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
    margin: auto;
    width: 50px;
    height: 50px;
    margin-top:  ${props => props.theme.space[12]};
    border: 8px solid #f3f3f3; 
    border-top: 8px solid #383636; 
    border-radius: 50%;
    animation: ${rotate} 1.5s linear infinite;
`;

export default function Spinner() {
  return (
    <SpinnerWrapper className="loading-spinner" />
  )
}
