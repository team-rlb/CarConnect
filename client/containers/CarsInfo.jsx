import { Button } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import CarsList from '../Components/CarsList';

export default function CarsInfo() {

  const [carsCom, setCarsCom] = useState([]);
  const [autoTrader, setAutoTrader] = useState([]);

  useEffect(() => {
  //  async function fetchMyAPI() {
  //    let response = await fetch('/api/scrape/Honda/Civic/2015/10001')
  //    response = await response.json()
  //    setCarsCom(response.carsComData)
  //  }

  //  fetchMyAPI()
   
  }, [carsCom])

  const fetching = () => {
    fetch('/api/scrape/Honda/Civic/2015/10001')
    // + new URLSearchParams({
    //   make: "Honda",
    //   model: "Civic",
    //   minYear: 2015,
    //   zip: 10001 
    //})
      .then(response => response.json())
      .then(data => {
         //console.log('data', data.carsComData, 'testing')
        setCarsCom(data.carsComData)
        setAutoTrader(data.autoTraderData)
         //console.log('setcarscom')
        // setAutoTrade(data.carGurusData)
      })
      .catch(err => console.log(err))
  }


  return (
    <>
    <Button onClick={fetching}>Search</Button>
    <div style={{
      display: 'flex',
      justifyContent: 'space-evenly'
    }}>
      {/* {console.log('hello1', carsCom)} */}
      <CarsList carsArr={carsCom} />
      <CarsList carsArr={autoTrader} />
    </div>
    </>
  )
}
