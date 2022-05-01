import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as API from '../utils/http/api';
import Spinner from '../components/Spinner';
import BreweryData from '../components/BreweryData';
import styled from 'styled-components';
import IconButton from '../components/IconButton';
import { ReactComponent as BackArrow } from '../assets/icons/backArrow.svg';

const MainContainer = styled.div`
    width: fit-content;
    margin: auto;
`;

export default function Brewery() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [breweryData, setBreweryData] = useState(null);

  useEffect(() => {
    API.getBrewery(id)
        .then(res => setBreweryData(res))
        .catch(err => console.error(err));
  }, []);

  return (
      <MainContainer>
        <IconButton onClick={() => navigate(-1)}>
          <BackArrow/>
        </IconButton>
        <div style={{minWidth: '376px'}}>
          { breweryData ? <BreweryData details={breweryData} /> : <Spinner /> }
        </div>
      </MainContainer>
  )
}
