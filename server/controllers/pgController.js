const db = require('../models/pgModels.js');
const puppeteer = require('puppeteer');
// carsDotComScraper = require('../scrapers/carsDotComScraper')
const carsDotComScraper = require('../scrapers/carsDotComScraper.js')


const pgController = {};

// //this one is not working at all
// pgController.scraper = (req, res, next) => {
// //   const url = `https://www.cars.com/shopping/results/?dealer_id=&keyword=&list_price_max=&list_price_min=&makes[]=honda&maximum_distance=200&mileage_max=&models[]=honda-civic&page_size=10&sort=list_price&stock_type=all&year_max=&year_min=2015&zip=11201`;
//   const url = 'https://www.carvana.com/cars/honda-civic/filters/?cvnaid=eyJtb2RlbElkcyI6WzU2XSwiZnJlZURlbGl2ZXJ5IjpmYWxzZSwic29ydEJ5IjoiTG93ZXN0UHJpY2UifQ%3D%3D'
//   console.log('hi')
//   const scrape = async (url) => {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.goto(url)
//     //const [el] = await page.$('#')
//     const data = await page.evaluate(() => {
//         const test = document.querySelector('span')
//     //   const array = [];

//       const price = document.querySelector('.price ').innerText.slice(1);
//     //   prices.forEach(price => array.push(price.innerText));
//       const [year, make, model] = document.querySelector('.year-make').innerText.split(' ');
//     // .tk-pane.middle-frame-pane div
//     // "price "
      
//       const mileageDiv = document.querySelector('.trim-mileage').querySelectorAll('span');
//       const [mileage] = mileageDiv[1].innerText.split(' ');
//     //   mileages.forEach(mileage => array.push(mileage.innerText));
//     // page.click('.price ')
//       return {
//           price, year, make, model, mileage, url
//         // price, year, make, model, mileage, url
//       }
//     });
    
//     await browser.close();
//     res.locals.carData = data
//     return next();

//  };

//  scrape();

// }
pgController.getCarsComData = async (req, res, next) => {
 const { make, model, minYear, zip } = req.body;
 res.locals.carsComData = await carsDotComScraper(make, model, minYear, zip);
 return next();
}

// pgController.getCarGuruData = (req, res, next) => {
//   const { make, model, minYear, zip } = req.body;
//   res.locals.carData.carGuruData = carGuruScraper(make, model, minYear, zip)
//   return next()
//  }

// APi (/asdasd/, Carsdotcomcontroller, cargurucontroller, => {
//   res.locals.carguru, res.locals.carsdotcome 
  
// })


// add controllers
pgController.getSavedData = (req, res, next) => {
  const {make, model} = req.params
  // const values = [make,model];
  const queryStr = `SELECT c.make AS make, c.model, p.year, p.date, p.price, p.url
  FROM prices AS p
  JOIN cars AS c
  ON p.car_id = c._id
  WHERE c.make = "Honda";`
  //I'm having problems with the query string, if you get rid of everything after the 'WHERE' it will return all two tables mixed, but if I specify what I just want the make Honda it crashes

  db.query(queryStr)
    .then(carInfo => {
      console.log(carInfo.rows)
      return next();
    })
    .catch(err => console.log(err))
}

module.exports = pgController;