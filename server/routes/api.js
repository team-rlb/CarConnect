const express = require('express');
const pgController = require('../controllers/pgController');
const router = express.Router();

// routers to handle requests and invoke middleware functions that get executed by controller
router.get('/scrape/:make/:model/:minYear/:zip',
  pgController.getCarsComData,
  // pgController.insertCarsComData,
  pgController.getAutoTraderData,
  (req, res) => res.status(200).json({ carsComData: res.locals.carsComData, autoTraderData: res.locals.autoTraderData })
);

//router.post('/dataDisplay', pgController.getCarsComData, pgController.insertCarsComData)

module.exports = router;

// controller.scrapeCarInfo,