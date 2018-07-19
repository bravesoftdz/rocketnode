const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main', { mensagem: '' });
});

app.post('/check', (req, res) => {
  if (req.body.datebirth) {
    const age = moment().diff(moment(req.body.datebirth, 'YYYY-MM-DD'), 'years');
    if (age >= 18) {
      res.redirect(`/major?name=${req.body.name}`);
    } else {
      res.redirect(`/minor?name=${req.body.name}`);
    }
  }
});

app.use('/minor', (req, res, next) => {
  if (req.query.name) {
    next();
  } else {
    res.redirect('/');
  }
});

app.use('/major', (req, res, next) => {
  if (req.query.name) {
    next();
  } else {
    res.redirect('/');
  }
});

app.get('/minor', (req, res) => {
  res.render('minor', { message: `Que pena ${req.query.name}, você tem menos que 18 anos` });
});

app.get('/major', (req, res) => {
  res.render('major', { message: `Parabéns ${req.query.name}, você tem mais que 18 anos` });
});

app.listen(3000);
