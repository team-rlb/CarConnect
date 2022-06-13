const axios = require('axios');
const cheerio = require('cheerio');

const trueCarScraper = async (make, model, minYear, zip) => {
  const cars = [];
  cheerioScrapeTrueCar = async (url) => {
// 

  let data = {}
  await axios(url)
    .then(response => {
      const htmlData = response.data;
      const $ = cheerio.load(htmlData);
      const date = new Date();
      const actualDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      console.log('hi')
      const scrape = $("[data-test='allVehicleListings']").find('.vehicle-card').map((i, el) => {    
        const vehicleObj = {};
        const priceElement = $(el).find("[data-test='vehicleListingPriceAmount']").find('.heading-3');
        const mileageElement = $(el).find('.font-size-1 text-truncate');
        // console.log('hi', mileageElement)

        // card-image > img-container

        // const image = $(el).find('.card-image').find('.img-container').find('img').attr('src') ? 
        //         $(el).find('.card-image').find('.img-container').find('img').attr('src')
        //         : '' ;        
        const year = $(el).find('.vehicle-card-year');
        const titleElement = $(el).find("[data-test='vehicleCardYearMakeModel']");
        const url = `truecar.com${$(el).find('a').attr('href')}`;
        // console.log('title ele', titleElement, 'end');
        vehicleObj.price = Number(priceElement.text().replace(/\D/g, ''));
        vehicleObj.image = 'https://cdn.motor1.com/images/mgl/1Zz3jK/s1/lamborghini-huracan-tecnica.jpg';
        vehicleObj.mileage = Number(mileageElement.text().replace(/\D/g, ''));
        [ vehicleObj.year, vehicleObj.make, vehicleObj.model ] = titleElement.text().split(' ')
        vehicleObj.year = Number(vehicleObj.year);
        vehicleObj.url = url;
        vehicleObj.zip = Number(zip);
        vehicleObj.date = actualDate;
        cars.push(vehicleObj);
        })
      })
      .catch(err => console.log(err, 'Error in trueCarScraper function'));
}

// cheerioScrapeCarsCom is working perfectly
 await cheerioScrapeTrueCar(`https://www.truecar.com/used-cars-for-sale/listings/${make}/${model}/year-${minYear}-max/location-${zip}/?sort[]=price_asc`);
 console.log('cars', cars, 'end cars')
 
 return cars.slice(3);
}


module.exports = trueCarScraper;