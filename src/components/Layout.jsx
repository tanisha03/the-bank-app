import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 2%;
`;

export default function Layout(props) {
  return (
    <MainContainer>
        {props.children}
    </MainContainer>
  )
}
