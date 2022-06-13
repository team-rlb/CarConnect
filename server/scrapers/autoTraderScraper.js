const axios = require('axios');
const cheerio = require('cheerio');

const autoTraderScraper = async (make, model, minYear, zip) => {
  const cars = [];
  cheerioScraperAutoTrader = async (url) => {
// 

  await axios(url)
    .then(response => {
      const htmlData = response.data;
      const $ = cheerio.load(htmlData);
      const date = new Date();
      const actualDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

      $('.col-xs-12').find('.inventory-listing').map((i, el) => {    
        const vehicleObj = {};
        const priceElement = $(el).find('.first-price');
        const mileageElement = $(el).find('.item-card-specifications').find('.text-bold');
        // const image = $(el).find('.padding-0 > .row > .item-card > .col-xs-12 > .positioned-overlay > .positioned-overlay-wrapper > .positioned-overlay-base > a > div > img').attr('src') ? 
        //         $(el).find('.padding-0 > .row > .item-card > .col-xs-12 > .positioned-overlay > .positioned-overlay-wrapper > .positioned-overlay-base > a > div > img').attr('src')
        //         : '' ;
        const titleElement = $(el).find('.row').find('.text-left').find('.text-bold');
        // console.log('hello Im title element', titleElement)
        const url = `autotrader.com${$(el).find('a').attr('href')}`;
        // console.log('are we here?', priceElement, mileageElement, image, titleElement, url)
        vehicleObj.price = Number(priceElement.text().replace(/\D/g, ''));
        vehicleObj.image = 'https://media.nbclosangeles.com/2021/10/Uber_StarCars_PRHero_SB_STREET_16x9-01.png?fit=1920%2C1080&quality=85&strip=all';
        vehicleObj.mileage = Number(mileageElement.text().replace(/\D/g, ''));
        vehicleObj.year = Number(titleElement.text().split(' ').slice(0, 4).join('').replace(/\D/g, '')); // [2015, Honda, Civic, LX]
        vehicleObj.model = model;
        vehicleObj.make = make;
        vehicleObj.url = url;
        vehicleObj.zip = Number(zip);
        vehicleObj.date = actualDate;
        cars.push(vehicleObj);
        // console.log(titleElement.text().trim())
        
        })
      })
      .catch(err => console.log(err, 'Error in autoTraderScraper function'));
}

// cheerioScrapeCarsCom is working perfectly
 await cheerioScraperAutoTrader(`https://www.autotrader.com/cars-for-sale/all-cars/${make.toLowerCase()}/${model.toLowerCase()}/${zip}?searchRadius=50&startYear=${minYear}&sortBy=derivedpriceASC&numRecords=50`);
 console.log('cars', cars, 'end cars')
 
 return cars.slice(3);
}


module.exports = autoTraderScraper;