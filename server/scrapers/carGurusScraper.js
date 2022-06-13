const axios = require('axios');
const cheerio = require('cheerio');

const carGurusScraper = async (make, model, minYear, zip) => {
  const cars = [];
  cheerioScraperCarGurus = async (url) => {
// 

  let data = {}
  await axios(url)
    .then(response => {
      const htmlData = response.data;
      const $ = cheerio.load(htmlData);
      const date = new Date();
      const actualDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

      const scrape = $('.MOfIEd XcutUU prRsnF').find('.lmXF4B c7jzqC A1f6zD').map((i, el) => {    
        const vehicleObj = {};
        const priceElement = $(el).find('.JzvPHo');
        const mileageElement = $(el).find('.SLB6rU');
        const image = $(el).find('d8tWMF TeYsNC').find('img').attr('src') ? 
                $(el).find('d8tWMF TeYsNC').find('img').attr('src')
                : '' ;
        const titleElement = $(el).find('.vO42pn');
        const url = `autotrader.com${$(el).find('a').attr('href')}`; //lmXF4B c7jzqC A1f6zD
        console.log('are we here?', priceElement, mileageElement, image, titleElement, url)
        vehicleObj.price = Number(priceElement.text().replace(/\D/g, ''));
        vehicleObj.image = image;
        vehicleObj.mileage = Number(mileageElement.text().replace(/\D/g, ''));
        vehicleObj.year = Number(titleElement.text().replace(/\D/g, '')); // [2015, Honda, Civic, LX]
        vehicleObj.model = model;
        vehicleObj.make = make;
        vehicleObj.url = url;
        vehicleObj.zip = Number(zip);
        vehicleObj.date = actualDate;
        cars.push(vehicleObj);
        // console.log(titleElement.text().trim())
        
        })
      })
      .catch(err => console.log(err, 'Error in carsDotComScraper function'));
}

// cheerioScrapeCarsCom is working perfectly
 await cheerioScraperCarGurus(`https://www.cargurus.com/Cars/l-Used-${make.toLowerCase()}-${model.toLowerCase()}-d586_L22933?zip=${zip}`);
 console.log('cars', cars, 'end cars')
 
 return cars;
}


module.exports = carGurusScraper;