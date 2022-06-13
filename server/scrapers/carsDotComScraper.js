const axios = require('axios');
const cheerio = require('cheerio');

const carsDotComScraper = async (make, model, minYear, zip) => {
  const cars = [];
  cheerioScrapeCarsCom = async (url) => {
// 

  let data = {}
  await axios(url)
    .then(response => {
      const htmlData = response.data;
      const $ = cheerio.load(htmlData);
      const date = new Date();
      const actualDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

      const scrape = $('.vehicle-cards').find('.vehicle-card').map((i, el) => {    
        const vehicleObj = {};
        const priceElement = $(el).find('.primary-price');
        const mileageElement = $(el).find('.mileage');
        const image = $(el).find('.image-wrap').find('img').attr('data-src') ? 
                $(el).find('.image-wrap').find('img').attr('data-src') 
                : '' ;
        const titleElement = $(el).find('.title');
        const url = `cars.com${$(el).find('a').attr('href')}`;
        vehicleObj.price = Number(priceElement.text().replace(/\D/g, ''));
        vehicleObj.image = image;
        vehicleObj.mileage = Number(mileageElement.text().replace(/\D/g, ''));
        [ vehicleObj.year, vehicleObj.make, vehicleObj.model ] = titleElement.text().split(' '); // [2015, Honda, Civic, LX]
        vehicleObj.year = Number(vehicleObj.year);
        vehicleObj.url = url;
        vehicleObj.zip = Number(zip);
        vehicleObj.date = actualDate;
        cars.push(vehicleObj);
        
        })
      })
      .catch(err => console.log(err, 'Error in carsDotComScraper function'));
}

// cheerioScrapeCarsCom is working perfectly
 await cheerioScrapeCarsCom(`https://www.cars.com/shopping/results/?dealer_id=&keyword=&list_price_max=&list_price_min=&makes[]=${make.toLowerCase()}&maximum_distance=50&mileage_max=&models[]=${make.toLowerCase()+'-'+model.toLowerCase()}&page_size=50&sort=list_price&stock_type=all&year_max=&year_min=${minYear}&zip=${zip}`);
//  console.log('cars', cars, 'end cars')
 
 return cars.slice(3);
}


module.exports = carsDotComScraper;