import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { debouncedFunction  } from '../utils/helpers';
import * as API from '../utils/http/api';
import Spinner from '../components/Spinner';
import DashImage from '../assets/images/dash.png';
import Input from '../components/Input';
import { CITIES, CATEGORY, COLUMNS } from '../configs/constants';
import Table from '../components/Table';
import StyledSelect from '../components/StyledSelect';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';

const HeroContainer = styled.div`
  margin-bottom: ${props => props.theme.space[4]};
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const DEBOUNCED_TIME = 1000;
const CACHE_MINUTES = 40;
  
export default function Home() {
 const [selectedCity, setSelectedCity] = useState('DELHI');
 const [selectedCategory, setSelectedCategory] = useState('IFSC');
 const [banksData, setBanksData] = useState([]);
 const [displayedBankData, setDisplayedBankData] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [currentPage, setCurrentPage] = useState(1);
 const [minPageLimit, setMinPageLimit] = useState(0);
 const [maxPageLimit, setMaxPageLimit] = useState(10);
 const [maxRows, setMaxRows] = useState(10);
 const pageNumberLimit = 5;

 const fetchResults = async (isCached, city, category, query) => {
    !isCached && setIsLoading(true);
    API.getBanks(city, category, query)
    .then(res => {
        const slicedRows = res.slice(0, maxRows);
        debugger
        setBanksData(res);
        setDisplayedBankData(slicedRows);
        localStorage.setItem(city, JSON.stringify(slicedRows));
        setCurrentPage(1);
        setIsLoading(false);
    })
    .catch(err => console.error(err))
 }

 useEffect(() => {
    const oldTimestamp = JSON.parse(localStorage.getItem('timestamp'));
    const newTimestamp = new Date().getTime().toString();
    const difference = (newTimestamp - oldTimestamp)/1000/60;
    if(difference > CACHE_MINUTES) {
        CITIES.map(city => localStorage.removeItem(city.value));
        localStorage.setItem('timestamp', new Date().getTime());
        setIsLoading(true);
    }
  }, []);

 useEffect(() => {
    const cachedData = localStorage.getItem(selectedCity);
    cachedData && setDisplayedBankData(JSON.parse(cachedData));
    fetchResults(cachedData!==null, selectedCity);
 }, [selectedCity]);

 const handleChange = (e) => {
    setSearchQuery(e.target.value);
}

 const handleOnKeyUp = useCallback(debouncedFunction((e) => {
    let searchedValue = e.target.value;
    if(searchedValue) {
        fetchResults(false, selectedCity, selectedCategory, searchedValue);
    }
}, DEBOUNCED_TIME), []);

const handleOnKeyUpRows = debouncedFunction((e) => {
    let rowsValue = parseInt(e.target.value);
    if(rowsValue && rowsValue < banksData.length) {
        setDisplayedBankData(banksData.slice(0, rowsValue));
        setCurrentPage(1);
        setMaxRows(rowsValue);
    }
}, DEBOUNCED_TIME);

const handleOnPrevClick = () => {
    if((currentPage-1) % pageNumberLimit === 0){
        setMaxPageLimit(maxPageLimit - pageNumberLimit);
        setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    const startIndex = (currentPage-1)*maxRows;
    setDisplayedBankData(banksData.slice(startIndex, startIndex+maxRows));
    setCurrentPage(currentPage-1);
}

const handleOnNextClick = () => {
    if(currentPage+1 > maxPageLimit){
        setMaxPageLimit(maxPageLimit + pageNumberLimit);
        setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    const startIndex = (currentPage)*maxRows;
    setDisplayedBankData(banksData.slice(startIndex, startIndex+maxRows));
    setCurrentPage(currentPage+1);
}

const handleOnPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
}

 return (
    <>
        <HeroContainer>
            <div>
                <h1>Search the bank</h1>
                <img src={DashImage} alt="" />
            </div>
            <div>
                <StyledSelect options={CITIES} name="Cities" id="cities" onChange={(e) => setSelectedCity(e.target.value)}/>
                <StyledSelect options={CATEGORY} name="category" onChange={(e) => setSelectedCategory(e.target.value)}/>
                <Input value={searchQuery} onChange={handleChange} onKeyUp={handleOnKeyUp}/>
            </div>
        </HeroContainer>
       {  
         isLoading ? <Spinner/> : 
           ( displayedBankData.length ? (
           <>
                <Table columns={COLUMNS} data={displayedBankData} />
                <div style={{marginTop: '16px', float: 'right'}}>
                    <div>
                        Rows: <input type="number" value={maxRows} onChange={e => setMaxRows(parseInt(e.target.value))} onKeyUp={handleOnKeyUpRows}/>
                    </div>
                    <Pagination 
                        currentPage={currentPage} 
                        maxPageLimit={maxPageLimit} 
                        minPageLimit={minPageLimit} 
                        totalPages={parseInt(banksData.length/maxRows) || 10}
                        onPrevClick={handleOnPrevClick} 
                        onNextClick={handleOnNextClick}
                        onPageChange={handleOnPageChange}
                    />
                </div>
           </>
        ) : ( <EmptyState/> ))}
    </>
  )
}
