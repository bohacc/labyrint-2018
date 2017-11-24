var path = require('path');
var team = require('../team.js');
var captcha = require('../../captcha/recaptcha.js');

module.exports = function (app) {
  app.get('/api/data.json', function (req, res, next) {
    res.json({});
  });

  app.get('/api/search', function (req, res, next) {
    res.json({});
  });

  app.post('/api/team', team.addTeam);

  app.post('/api/registration', team.registration);

  app.get('/validate_captcha', captcha.recaptcha);

  app.get('/checkRecaptcha', captcha.captchaCheck);

  app.get('/', function (req, res) {
    return res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

  app.get('*', function (req, res) {
    return res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
};
