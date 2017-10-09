const divisionRequest = require('../../model/division-request');
const divisionCalc = require('../../service/division');

const configureRoute = (app) => {
  app.get('/webapi/', (req, res, next) => {
    res.json({});
  });

  app.post('/webapi/division', (req, res, next) => {
    const {referenceLength, elements} = req.body;
    const model = divisionRequest(elements);

    const result = divisionCalc.getDivision(elements, referenceLength);
    res.json(result);
  });
}

module.exports = configureRoute;