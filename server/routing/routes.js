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
      
      app.post('/api/registration', captcha.recaptcha, team.registration);
      
      app.use('*', function (req, res) {
        return res.sendFile(path.join(__dirname, 'dist/index.html'));
      });   
      
      app.get('/validate_captcha', (req, res) => {
        const secret = '6LfQWjYUAAAAAKS7VK_YjTqBum-GAsTVherzlVMJ';
        const options = {
          method: 'POST',
          uri: 'https://www.google.com/recaptcha/api/siteverify',
          qs: {
            secret,
            response: req.query.token  
          },
          json: true
        };
        
        rp(options)
          .then(response => res.json(response))
          .catch(() => {});
        
      });
};