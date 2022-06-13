import React from 'react';
import { useEffect } from 'react';
import CarsList from '../Components/CarsList';

export default function CarsInfo() {

  const [carsCom, setCarsCom] = useState([]);
  const [autoTrade, setAutoTrade] = useState([]);

  useEffect(() => {
    fetch('/api/scrape/' + new URLSearchParams({
      make: "Honda",
      model: "Civic",
      year: 2015,
      zip: 10001 
    }))
      .then(response => response.json())
      .then(data => {
        setCarsCom(data.carsComData)
        // setAutoTrade(data.carGurusData)
      })
      .catch(err => console.log(err))
  })

  return (
    <>
      <CarsList carsArr={carsCom} />
      <CarsList carsArr={autoTrade} />
    </>
  )
}
