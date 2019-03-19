var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

router.get('/about', function (req, res) {
  res.send('Coming Soon!');
});

module.exports = router;
