var rp = require('request-promise');

exports.recaptcha = function (req, res, next) {
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
}

exports.captchaCheck = function (req, res, next) {
  res.json({success: true});
}