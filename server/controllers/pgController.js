const db = require('../models/pgModels.js');
const puppeteer = require('puppeteer');
// carsDotComScraper = require('../scrapers/carsDotComScraper')
const carsDotComScraper = require('../scrapers/carsDotComScraper.js')


const pgController = {};

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

pgController.insertCarsComData = (req, res, next) => {
  const { carsComData } = res.locals;
  carsComData.map(car => {
    const { price, image, mileage, year, make, model, url } = car
    const VALUES = [price, image, mileage, year, make, model, url]
    const queryStr = `UPSERT INTO cars (price, image, mileage, year, make, model, url)
                      VALUES($1, $2, $3, $4, $5, $6, $7)`
    db.query(queryStr, VALUES)
  })
  
  db.query(queryStr)
    .then(data => {
      // do stuff with the data or something
      return next();
    })
    .catch(err => (next(err)));
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