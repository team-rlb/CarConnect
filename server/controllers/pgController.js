const db = require('../models/pgModels.js');
const puppeteer = require('puppeteer');
const pgController = {};


pgController.scraper = (req, res, next) => {
//   const url = `https://www.cars.com/shopping/results/?dealer_id=&keyword=&list_price_max=&list_price_min=&makes[]=honda&maximum_distance=200&mileage_max=&models[]=honda-civic&page_size=10&sort=list_price&stock_type=all&year_max=&year_min=2015&zip=11201`;
  const url = 'https://www.carvana.com/cars/honda-civic/filters/?cvnaid=eyJtb2RlbElkcyI6WzU2XSwiZnJlZURlbGl2ZXJ5IjpmYWxzZSwic29ydEJ5IjoiTG93ZXN0UHJpY2UifQ%3D%3D'
  console.log('hi')
  const scrape = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url)
    //const [el] = await page.$('#')
    const data = await page.evaluate(() => {
        const test = document.querySelector('span')
    //   const array = [];

      const price = document.querySelector('.price ').innerText.slice(1);
    //   prices.forEach(price => array.push(price.innerText));
      const [year, make, model] = document.querySelector('.year-make').innerText.split(' ');
    // .tk-pane.middle-frame-pane div
    // "price "
      
      const mileageDiv = document.querySelector('.trim-mileage').querySelectorAll('span');
      const [mileage] = mileageDiv[1].innerText.split(' ');
    //   mileages.forEach(mileage => array.push(mileage.innerText));
    // page.click('.price ')
      return {
          price, year, make, model, mileage
        // price, year, make, model, mileage, url
      }
    });
    console.log('hi2', data)
    
    // need title class for 'Year Make Model'
    // need mileage class for mileage
    // need primary-price class for price
    // info needed for db: year, date, price, mileage, url, make, model
   
    
    await browser.close();
    res.locals.carData = data
    return next();

 };

 scrape();

}


// pgController.getPrices = (req, res, next) => {
    // if data exists already in database, pull the data from database
    // querParams would be the url basically
    // const {make, model, minYear, zip} = req.body;
  // db.query()
  // await this.scraper(`https://www.cars.com/shopping/results/?dealer_id=&keyword=&list_price_max=&list_price_min=&makes[]=${make}&maximum_distance=200&mileage_max=&models[]=${make+'-'+model}&page_size=20&sort=list_price&stock_type=all&year_max=&year_min=${minYear}&zip=${zip}`)
//   const data = pgController.scraper(`https://www.cars.com/shopping/results/?dealer_id=&keyword=&list_price_max=&list_price_min=&makes[]=honda&maximum_distance=200&mileage_max=&models[]=honda-civic&page_size=20&sort=list_price&stock_type=all&year_max=&year_min=2015&zip=11201`)
//   res.locals.carData = data
//   return next();
  // else call the scraper to collect the data and put it in the database
// }
// file where we actually execute the queries on the db

// add controllers
// pgController.getSavedData = (req, res, next) => {
//   db.query()
// }

module.exports = pgController;