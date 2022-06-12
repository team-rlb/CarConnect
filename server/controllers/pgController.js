const db = require('../models/pgModels.js');
const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');

const pgController = {};

//this one is not working at all
pgController.scraper = (req, res, next) => {
//   const url = `https://www.cars.com/shopping/results/?dealer_id=&keyword=&list_price_max=&list_price_min=&makes[]=honda&maximum_distance=200&mileage_max=&models[]=honda-civic&page_size=10&sort=list_price&stock_type=all&year_max=&year_min=2015&zip=11201`;
  const url = 'https://www.carvana.com/cars/honda-civic/filters/?cvnaid=eyJtb2RlbElkcyI6WzU2XSwiZnJlZURlbGl2ZXJ5IjpmYWxzZSwic29ydEJ5IjoiTG93ZXN0UHJpY2UifQ%3D%3D'
  console.log('hi')
  const scrape = async (url) => {
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
          price, year, make, model, mileage, url
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


pgController.scrapeCarInfo = (req, res, next) => {
    // if data exists already in database, pull the data from database
    // querParams would be the url basically
  const {make, model, minYear, zip} = req.body;
  //cheerioScrapeCarsCom one is working perfeclty
  cheerioScrapeCarsCom = (url) => {
    axios(url)
    .then(response => {
      
      const htmlData = response.data;
      const $ = cheerio.load(htmlData);
      // console.log('helooooo', 
      //-------------------------------This Works ------------------------------------------------------------
      // const arrayYolo = [];
      // const tester = $('.vehicle-cards').map((i, el) => {
      //   console.log('from cheerio.load', el)
      //   // const vehicleCard = el
        
      //   const vehicleObj = {};
      //   //vehicle-card   vehicle-card-with-reviews
      //   const priceElement = $(el).find('.primary-price');
      //   const mileageElement = $(el).find('.mileage');
      //   const titleElement = $(el).find('.title');
      //   vehicleObj.price = priceElement.text().trim().split('$').slice(1);
      //   vehicleObj.mileage = mileageElement.text().trim().split(' mi.').slice(0, -1);
      //   vehicleObj.title = titleElement.text().trim();
      //   arrayYolo.push(priceElement.text().trim());
      //   return vehicleObj;
      // })
        //-------------------------------This Works ------------------------------------------------------------
      // console.log(' This is array Yolo', arrayYolo)
  

      // $('.vehicle-cards').reduce((acc, vehicleCard) => {
      //   if(vehicleCard === $('.vehicle-card'))
      // })
      // console.log('this is vehicle cards', e)
      console.log(tester[0])

      //inside vehicle-cards class(contains all the prices and info for cars we grab the prices)
      const price = $('.primary-price').html().slice(1).replace(/\D/g, ''); // extracts price number
      const mileage = $('.vehicle-card .vehicle-card-main .vehicle-details .mileage').html().replace(/\D/g, ''); // extracts mileage number
      const [year, make, model] = $('.title').html().split(' ');
      // console.log(price, year, make, model, mileage); 
      const date = new Date();
      const dayDate = date.getDate();
      const monthDate = date.getMonth() + 1;
      const yearDate = date.getFullYear();
      res.locals.carData = {
        price, year, make, model, mileage, url,
        date: `${monthDate}/${dayDate}/${yearDate}`
      }
      return next();
    })
    .catch(err => console.log(err));
  }
  
  // cheerioScrapeCarsCom is working perfectly
  cheerioScrapeCarsCom(`https://www.cars.com/shopping/results/?dealer_id=&keyword=&list_price_max=&list_price_min=&makes[]=${make.toLowerCase()}&maximum_distance=200&mileage_max=&models[]=${make.toLowerCase()+'-'+model.toLowerCase()}&page_size=10&sort=list_price&stock_type=all&year_max=&year_min=${minYear}&zip=${zip}`);

  //I haven't found a website that allows me get data and has a fancy url to work with
  cheerioScrapeEdmunds = (url) => {
    axios(url)
      .then(response => {
        const htmlData = response.data;
        const $ = cheerio.load(htmlData);
        const price = $('span[itemprop="price"]').html();
        console.log(price);
        res.status(200).send('done')
        // .slice(1).replace(/\D/g, '') const mileage = $('.vehicle-card .vehicle-card-main .vehicle-details .mileage').html().replace(/\D/g, '');
        // const [year, make, model] = $('.title').html().split(' ');
        // console.log(price, year, make, model, mileage);
        // const date = new Date();
        // const dayDate = date.getDate();
        // const monthDate = date.getMonth() + 1;
        // const yearDate = date.getFullYear();
        // res.locals.carData = {
        //   price, year, make, model, mileage, url,
        //   date: `${monthDate}/${dayDate}/${yearDate}`
        // }
        // return next();
      })
      .catch(err => console.log(err))
  }
  
  //I haven't found a website that allows me get data and has a fancy url to work with
  // cheerioScrapeEdmunds(`https://www.carsdirect.com/used_cars/listings/honda/civic?zipcode=33157&dealerId=&distance=&yearFrom=&yearTo=&priceFrom=&priceTo=&qString=Honda%603%6023%600%600%60false%7CCivic%604%60253%600%600%60false%7C&keywords=&makeName=honda&modelName=civic&sortColumn=Price&sortDirection=ASC&searchGroupId=&lnk=&vehicleDetailLead=false&recentSearchId=12762496&pageNum=1`);
}
// file where we actually execute the queries on the db

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