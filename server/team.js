const Datastore = require('@google-cloud/datastore');
// Instantiates a client
const datastore = Datastore({
  projectId: 'labyrint-2018'
});

exports.registration = function (req, res, next) {
    res.json({});
};

exports.checkLimit = function (req, res, next) {
  res.json({date: Date.now()});
};

exports.addTeam = function (req, res, next) {
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
}
