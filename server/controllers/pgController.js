const db = require('../models/pgModels.js');
const puppeteer = require('puppeteer');
// carsDotComScraper = require('../scrapers/carsDotComScraper')
const carsDotComScraper = require('../scrapers/carsDotComScraper.js')
const autoTraderScraper = require('../scrapers/autoTraderScraper.js')
const carGurusScraper = require('../scrapers/carGurusScraper.js');
const trueCarScraper = require('../scrapers/trueCarScraper.js');


const pgController = {};

pgController.getCarsComData = async (req, res, next) => {
 //console.log(req.params)
 const { make, model, minYear, zip } = req.params;
 res.locals.carsComData = await carsDotComScraper(make, model, minYear, zip);

 return next();
}

pgController.getAutoTraderData = async (req, res, next) => {
  const { make, model, minYear, zip } = req.params;
  res.locals.autoTraderData = await autoTraderScraper(make, model, minYear, zip);
 
  return next();
 }

 pgController.getCarGurusData = async (req, res, next) => {
  const { make, model, minYear, zip } = req.params;
  res.locals.carGurusData = await carGurusScraper(make, model, minYear, zip);
 
  return next();
 }

 pgController.getTrueCarData = async (req, res, next) => {
  const { make, model, minYear, zip } = req.params;
  res.locals.trueCarData = await trueCarScraper(make, model, minYear, zip);
 
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

pgController.insertCarsComData = async (req, res, next) => {
  const { carsComData } = res.locals;
  // carsComData.forEach(car => {
  //   const { price, image, mileage, year, make, model, url, zip, date } = car;
  //   const VALUES = [price, image, mileage, year, make, model, url, zip, date]
  //   const queryStr = `INSERT INTO cars(price, image, mileage, year, make, model, url, zip, date)
  //                     VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`
  //   db.query(queryStr, VALUES)
  //   .then(res => {
  //     console.log(res.rows)
  //     return next()
  //   })
  //   .catch(err => next(err));
  //   setTimeout(console.log('query done, waiting cuz we broke'), 1000);
  // })

  //------------------- CONCAT version below

  let queryStr = `INSERT INTO cars(price, image, mileage, year, make, model, url, zip, date) VALUES`                 
  carsComData.forEach(car => {
    console.log('hello we are in the loop pls help')
    const { price, image, mileage, year, make, model, url, zip, date } = car;
    
    queryStr += `(${price}, ${image}, ${mileage}, ${year}, ${make}, ${model}, ${url}, ${zip}, ${date}),`
  })
  queryStr = queryStr.slice(0, -1);
  queryStr += ';'
  //queryStr = queryStr.replace(/.$/, ';');
  console.log('last char is:', queryStr[queryStr.length-1]);

  await db.query(queryStr)
      .then(res => {
        console.log(res.rows)
        return next()
      })
      .catch(err => next(err));
}


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
    .catch(err => (next(err)));
}

module.exports = pgController;