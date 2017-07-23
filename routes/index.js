var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Express' });
  res.redirect('/division');
});

router.get('/division', (req, res, next) => {
  res.render('division', { title: 'Rozkrój' });
});

module.exports = router;
