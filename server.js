/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var errorHandler;

if (process.env.NODE_ENV === 'production') {
  require('@google/cloud-trace').start();
  errorHandler = require('@google/cloud-errors').start();
}

if (process.env.GCLOUD_PROJECT) {
  require('@google-cloud/debug-agent').start();
}

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var google = require('googleapis');
const Datastore = require('@google-cloud/datastore');
// Instantiates a client
const datastore = Datastore({
  projectId: 'labyrint-2018'
});

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/data.json', function (req, res, next) {
  res.json({});
});

app.get('/search', function (req, res, next) {
  res.json({});
});

app.post('/team', function (req, res, next) {
  const teamKey = datastore.key('Team');
  const entity = {
    key: teamKey,
    data: [
      {
        name: 'id',
        value: 1
      },
      {
        name: 'created',
        value: new Date().toJSON()
      },
      {
        name: 'name',
        value: 'test'
      }
    ]
  };

  datastore.save(entity)
    .then(() => {
      console.log(`Task ${teamKey.id} created successfully.`);
      res.json({success: true});
    })
    .catch((err) => {
      res.json({success: false});
      console.error('ERROR:', err);
    });
});

app.use('*', function (req, res) {
  return res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Basic error logger/handler
app.use(function (err, req, res, next) {
  res.status(500).send(err.message || 'Something broke!');
  next(err || new Error('Something broke!'));
});
if (process.env.NODE_ENV === 'production') {
  app.use(errorHandler.express);
}

if (module === require.main) {
  // Start the server
  var server = app.listen(process.env.port || 8080, function () {
    var port = server.address().port;

    console.log('App listening on port %s', port);
    console.log('Press Ctrl+C to quit.');
  });
}

module.exports = app;
