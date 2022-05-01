import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    #name {
      font-size: ${props => props.theme.fontSizes[6]};
      margin-bottom: ${props => props.theme.space[4]};
      display: flex;
      align-items: center;
    }
    #badge {
      background-color: ${props => props.theme.colors.primary.blue};
      color: ${props => props.theme.colors.primary.light};
      border-radius: ${props => props.theme.radii[2]};
      font-size: ${props => props.theme.fontSizes[3]};
      padding: ${props => props.theme.space[1]};
      margin-left: ${props => props.theme.space[2]};
    }
`;

export default function BreweryData(props) {
  const { name, brewery_type, city, state, country } = props.details;
  return (
    <Container>
        <div id="name">{name} <span id="badge">{brewery_type}</span></div>
        <div>{city}, {state}, {country}</div>
    </Container>
  )
}
