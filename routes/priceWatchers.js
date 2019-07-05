var express = require('express');
var router = express.Router();

let priceWatchers = {
  '1': {
    email: "",
    priceLow: undefined,
    priceHigh: undefined
  }
}

/* GET values listing. */
router.get('/', (req, res) => {
  res.json(priceWatchers);
});

router.post('/', (req, res) => {
  console.log('POST request received.');
  res.send(priceWatchers['1'] = req.body);
});

module.exports = router;