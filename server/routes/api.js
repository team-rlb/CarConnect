const express = require('express');
const pgController = require('../controllers/pgController');
const router = express.Router();

// routers to handle requests and invoke middleware functions that get executed by controller
router.get('/scrape',
  pgController.getCarsComData,
  (req, res) => res.status(200).json({ carsComData: res.locals.carsComData, carGuruData: 'carGuru'})
);

module.exports = router;

// controller.scrapeCarInfo,