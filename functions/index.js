// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions')
const rp = require('request-promise')

exports.checkRecaptcha = functions.https.onRequest((req, res) => {
    const token = req.query.token
    // console.log("recaptcha response", response)
    rp({
        uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
        method: 'POST',
        formData: {
            secret: '6LfQWjYUAAAAAKS7VK_YjTqBum-GAsTVherzlVMJ',
            response: token
        },
        json: true
    }).then(result => {
        console.log("recaptcha result", result);
        if (result.success) {
            res.json({success: true});
        }
        else {
            res.json({success: false});
        }
    }).catch(reason => {
        console.log("Recaptcha request failure", reason);
        res.json({success: false});
    })
})

exports.checkLimit = functions.https.onRequest((req, res) => {
  res.json({date: Date.now()});
});
