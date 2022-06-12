const axios = require('axios');
const cheerio = require('cheerio');

const carsDotComScraper = async (make, model, minYear, zip) => {
  // if data exists already in database by the unique listing URL, pull the data from database

//cheerioScrapeCarsCom one is working perfeclty
 const cars = [];

console.log('hi')
cheerioScrapeCarsCom = async (url) => {
// 

let data = {}
 await axios(url)
  .then(response => {
    
    const htmlData = response.data;
    const $ = cheerio.load(htmlData);
 
      const scrape = $('.vehicle-cards').find('.vehicle-card').map((i, el) => {
        
        const vehicleObj = {};
        const priceElement = $(el).find('.primary-price');
        const mileageElement = $(el).find('.mileage');
        const image = $(el).find('.image-wrap').find('img').attr('data-src');
        const titleElement = $(el).find('.title'); // title '2015 Honda Civic LX'
        const url = `cars.com${$(el).find('a').attr('href')}`;
        vehicleObj.num = i;
        vehicleObj.price = Number(priceElement.text().replace(/\D/g, ''));
        vehicleObj.image = image;
        vehicleObj.mileage = Number(mileageElement.text().replace(/\D/g, ''));
        [vehicleObj.year, vehicleObj.make, vehicleObj.model] = titleElement.text().split(' '); // [2015, Honda, Civic, LX]
        vehicleObj.year = Number(vehicleObj.year);
        vehicleObj.url = url;
        cars.push(vehicleObj);
  })
    console.log('hi2')
    // console.log('cars inside func', cars)
    // console.log(cars)
    const date = new Date();
    const dayDate = date.getDate();
    const monthDate = date.getMonth() + 1;
    const yearDate = date.getFullYear();
    data = {
        cars,
        date: `${monthDate}/${dayDate}/${yearDate}`
      }
  })
  .catch(err => console.log(err, 'Error in carsDotComScraper function'));
  console.log('hi3')
  return data
}

// cheerioScrapeCarsCom is working perfectly
 await cheerioScrapeCarsCom(`https://www.cars.com/shopping/results/?dealer_id=&keyword=&list_price_max=&list_price_min=&makes[]=${make.toLowerCase()}&maximum_distance=200&mileage_max=&models[]=${make.toLowerCase()+'-'+model.toLowerCase()}&page_size=10&sort=list_price&stock_type=all&year_max=&year_min=${minYear}&zip=${zip}`);
 console.log('cars', cars, 'end cars')
 return cars;
}


module.exports = carsDotComScraper;