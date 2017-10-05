var express = require('express');
var router = express.Router();
const divisionRequest = require('../../model/divisionRequest');
const divisionCalc = require('../../service/division');

router.get('/', function(req, res, next) {
  res.json({});
});


router.post('/', function(req, res, next) {
  const {referenceLength, elements} = req.body;
  const model = divisionRequest(elements);

  const result = divisionCalc.getDivision(elements, referenceLength);
  res.json(result);
});

module.exports = router;