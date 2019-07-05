var express = require('express');
var router = express.Router();

let valueData = {
  '1': {
    email: "",
    priceLow: undefined,
    priceHigh: undefined
  }
}

/* GET values listing. */
router.get('/', (req, res) => {
  res.json(valueData);
});

router.put('/values', (req, res) => {
  const valueUpdates = req.query;
  valueData[req.params.id] = valueUpdates;
  res.send(valueData[req.params.id])
}) 

module.exports = router;