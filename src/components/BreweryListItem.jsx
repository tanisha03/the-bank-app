import React from 'react'
import styled from 'styled-components'

const ListWrapper = styled.div`
    background: ${props => props.theme.colors.secondary.grey};
    cursor: pointer;
    margin-bottom: ${props => props.theme.space[2]};
    padding: ${props => props.theme.space[4]} ${props => props.theme.space[3]};
    border-radius: ${props => props.theme.radii[2]};
    #counter {
        background: ${props => props.theme.colors.secondary.darkGrey};
        color: ${props => props.theme.colors.primary.light};
        height: 100%;
        padding: ${props => props.theme.space[2]} ${props => props.theme.space[3]};
        border-radius: ${props => props.theme.radii[1]};
        margin-right: ${props => props.theme.space[2]};
    }
    #name {
        font-size: ${props => props.theme.fontSizes[4]};
    }
`;

export default function BreweryListItem({index, name, ...props}) {
  return (
    <ListWrapper {...props}>
        <span id="counter">{index}</span>
        <span id="name">{name}</span>
    </ListWrapper>
  )
}
