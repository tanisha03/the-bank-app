import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { useSearchParams, useNavigate } from "react-router-dom";
import { debouncedFunction  } from '../utils/helpers';
import * as API from '../utils/http/api';
import Spinner from '../components/Spinner';
import DashImage from '../assets/images/dash.png';
import EmptyState from '../components/EmptyState';
import StyledLink from '../components/StyledLink';
import BreweryListItem from '../components/BreweryListItem';

const MainContainer = styled.div`
    width: fit-content;
    margin: auto;
`;

const HeroContainer = styled.div`
  margin-bottom: ${props => props.theme.space[4]};
  h1 {
      font-size: ${props => props.theme.fontSizes[7]};
  }
  div {
      position: relative;
      margin-bottom: ${props => props.theme.space[7]};
      img {
          position: absolute;
          bottom: -8px;
      }
  }
`;

const StyledInput = styled.input`
    width:100%;
    border:2px solid #aaa;
    border-radius: ${props => props.theme.radii[2]};
    margin:8px 0;
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

const DEBOUNCED_TIME = 1000;
const NUMBER_OF_ITEMS = 5;

export default function Home() {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [searchedBreweries, setSearchedBreweries] = useState([]);
    const [listedBreweries, setListedBreweries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchResults = async (searchQuery) => {
        const itemParams = searchParams.get('items');
        API.searchBreweries(searchQuery)
        .then(res => {
            setIsLoading(false);
            setSearchedBreweries(res);
            itemParams ? setListedBreweries(res.slice(0, itemParams)) : res.length < 5 ? setListedBreweries(res) : setListedBreweries(res.slice(0, NUMBER_OF_ITEMS));
        })
        .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleOnKeyUp = useCallback(debouncedFunction((e) => {
        let searchedValue = e.target.value;
        if(searchedValue) {
            setIsLoading(true);
            searchParams.set('items', 5);
            fetchResults(searchedValue);
        }
        else setListedBreweries([]);
    }, DEBOUNCED_TIME), []);

    const handleItemClick = (id) => {
        setSearchParams({search: searchQuery, items: listedBreweries.length});
        navigate(`/${id}`);
    };

    const handleLoadMore = () => {
        setListedBreweries(searchedBreweries.slice(0, listedBreweries.length + NUMBER_OF_ITEMS));
    };

    useEffect(() => {
        const params = searchParams.get('search');
        params && fetchResults(params);
    }, []);

  return (
    <MainContainer>
        <HeroContainer>
            <div>
                <h1>Find the pitcher perfect brewery</h1>
                <img src={DashImage} alt="" />
            </div>
            <StyledInput value={searchQuery} onChange={handleChange} onKeyUp={handleOnKeyUp}/>
        </HeroContainer>
        <div>
            { isLoading ? <Spinner/> : (
                listedBreweries.length ? listedBreweries.map((brewery,i) => (
                    <BreweryListItem onClick={() => handleItemClick(brewery.id)} name={brewery.name} index={i+1} />
                )) : <EmptyState />
            )}
            { (!isLoading && listedBreweries.length>0 && listedBreweries!==searchedBreweries) && <StyledLink onClick={handleLoadMore}>{'+ Load More..'}</StyledLink> }
        </div>
    </MainContainer>
  )
}
