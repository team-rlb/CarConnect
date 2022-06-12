const express = require('express');
const controller = require('../controllers/pgController');
const router = express.Router();

// routers to handle requests and invoke middleware functions that get executed by controller
router.get('/scrape',
controller.scrapeCarInfo,
  (req, res) => res.status(200).json(res.locals.carData)
);

module.exports = router;

// controller.scrapeCarInfo,