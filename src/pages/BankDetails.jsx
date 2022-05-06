import React, {useEffect, useState} from 'react'
import { useSearchParams, useParams, useLocation } from "react-router-dom";
import * as API from '../utils/http/api';
import Spinner from '../components/Spinner';

export default function BankDetails() {
  let [queryParams, _] = useSearchParams();
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [banksData, setBanksData] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    const city = queryParams.get('city');
    if (state) setBanksData(state);
    else {
      // if data not passed as state via router, do a fresh call
      setIsLoading(true);
      API.getBanks(city, 'IFSC', id)
      .then(res => {
          setBanksData(res[0]);
          setIsLoading(false);
      })
      .catch(err => console.error(err));
    }
  }, []);
  
  return (
    <>
        {
           isLoading ? <Spinner/> : 
           ( 
            banksData && 
            <div>
                <div> Name: {banksData.bank_name} </div> 
                <div> Branch: {banksData.branch} </div> 
                <div> IFSC: {banksData.ifsc} </div> 
                <div> City: {banksData.city} </div> 
                <div> State: {banksData.state} </div> 
            </div>
           )
        }
    </>
  )
}
