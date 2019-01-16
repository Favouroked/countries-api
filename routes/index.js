var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const { jwtSecret } = require('../config/constants');
const auth = require('../middlewares/auth');

let countries = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ name: 'admin'}, jwtSecret);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Incorrect username or password' });
  }
});

router.get('/countries', auth, (req, res) => {
  res.status(200).json(countries);
});

router.put('/countries', auth, (req, res) => {
  const { country } = req.body;
  countries.push(country);
  res.status(200).json({ message: 'Country added successfully' });
});

router.delete('/countries', auth, (req, res) => {
  const { country } = req.body;
  let filtered = countries.filter(data => data !== country);
  countries = [ ...filtered ];
  res.status(200).json({ message: 'Country deleted successfully' });
});

module.exports = router;
